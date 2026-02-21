import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  })

  const users = [
    { email: 'admin@firstmilliontrade.com', password: 'Admin@123', role: 'admin', name: 'Admin User' },
    { email: 'mentor@firstmilliontrade.com', password: 'Mentor@123', role: 'mentor', name: 'Mohan Kumar' },
    { email: 'student@firstmilliontrade.com', password: 'Student@123', role: 'student', name: 'Rahul Sharma' },
  ]

  const results = []

  for (const u of users) {
    // Check if user already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers()
    const existing = existingUsers?.users?.find((eu: any) => eu.email === u.email)
    
    let userId: string

    if (existing) {
      userId = existing.id
      results.push({ email: u.email, status: 'already exists', id: userId })
    } else {
      const { data, error } = await supabase.auth.admin.createUser({
        email: u.email,
        password: u.password,
        email_confirm: true,
        user_metadata: { full_name: u.name }
      })
      if (error) {
        results.push({ email: u.email, status: 'error', error: error.message })
        continue
      }
      userId = data.user.id
      results.push({ email: u.email, status: 'created', id: userId })
    }

    // Ensure role exists
    const { error: roleError } = await supabase
      .from('user_roles')
      .upsert({ user_id: userId, role: u.role }, { onConflict: 'user_id,role' })

    if (roleError) {
      results.push({ email: u.email, role_status: 'error', error: roleError.message })
    }
  }

  // Create sample batch & classes for the mentor
  const mentorResult = results.find(r => r.email === 'mentor@firstmilliontrade.com')
  const studentResult = results.find(r => r.email === 'student@firstmilliontrade.com')

  if (mentorResult?.id) {
    const { data: batch } = await supabase.from('batches').upsert({
      name: 'Stock Market Fundamentals - Batch 1',
      description: 'Complete course covering stock market basics, technical analysis, and trading strategies.',
      mentor_id: mentorResult.id,
      status: 'active'
    }, { onConflict: 'id' }).select().single()

    if (batch) {
      // Add classes
      const classes = [
        { batch_id: batch.id, title: 'Introduction to Stock Markets', description: 'Overview of Indian stock markets, SEBI, NSE, BSE', scheduled_at: new Date(Date.now() + 86400000).toISOString(), duration_minutes: 90, zoom_link: 'https://zoom.us/j/1234567890', zoom_meeting_id: '1234567890', status: 'scheduled' },
        { batch_id: batch.id, title: 'Technical Analysis Basics', description: 'Candlestick patterns, support & resistance, moving averages', scheduled_at: new Date(Date.now() + 172800000).toISOString(), duration_minutes: 90, zoom_link: 'https://zoom.us/j/1234567891', zoom_meeting_id: '1234567891', status: 'scheduled' },
        { batch_id: batch.id, title: 'Risk Management & Position Sizing', description: 'Stop loss strategies, risk-reward ratios', scheduled_at: new Date(Date.now() - 86400000).toISOString(), duration_minutes: 60, zoom_link: 'https://zoom.us/j/1234567892', zoom_meeting_id: '1234567892', recording_url: 'https://zoom.us/rec/share/sample-recording', status: 'completed' },
      ]
      await supabase.from('classes').upsert(classes, { onConflict: 'id' })

      // Enroll student
      if (studentResult?.id) {
        await supabase.from('batch_students').upsert({ batch_id: batch.id, student_id: studentResult.id }, { onConflict: 'batch_id,student_id' })
      }
    }
  }

  return new Response(JSON.stringify({ results }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
