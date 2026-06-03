import Link from "next/link";
import styles from "./page.module.css";

const ARTICLES = {
  "the-art-of-gentle-transitions": {
    title: "The Art of Gentle Transitions",
    date: "June 2026",
    category: "Mindfulness",
    lead: "Why the spaces between what we do are just as important as the actions themselves.",
    content: [
      { type: "paragraph", text: "We live in a culture that treats life like a series of checkpoints. We finish one meeting and immediately dial into the next. We close a work spreadsheet and instantly open a cooking app. We transition from employee to parent, from partner to friend, without ever crossing a threshold. We just shift our weight and carry on, carrying the residue of the last moment into the next." },
      { type: "paragraph", text: "This constant friction is exhausting. Over the course of a day, the build-up of uncompleted actions and unexpressed feelings creates a quiet, persistent background noise. We feel fragmented, not because any single thing we did was too hard, but because we never fully finished one thing before starting another." },
      { type: "subheading", text: "The Threshold Practice" },
      { type: "paragraph", text: "I have started practicing what I call micro-transitions. They are small, intentional pauses between tasks. They are not productive. They do not require a tool. They are simply a way of saying: I am leaving that behind, and I am arriving here." },
      { type: "paragraph", text: "When I finish writing an email, I do not immediately start the next task. I close my eyes. I take a deep breath. I feel my feet on the floor. I let the task go. Sometimes, I will wash my hands, treating the warm water as a physical ritual to clean away the energy of the previous hour. It takes thirty seconds, but the mental shift is profound." },
      { type: "quote", text: "A gentle transition is a threshold. It is a way of protecting your energy by choosing to arrive fully in the present moment." },
      { type: "subheading", text: "Protecting Your Energy" },
      { type: "paragraph", text: "When we rush through transitions, we bring our stress with us. The frustration from a difficult conversation leaks into a quiet dinner. The anxiety of a deadline ruins a walk in the park. By creating a boundary, we protect the sanctity of each moment. We give ourselves permission to be where we are, rather than where we just were." },
      { type: "paragraph", text: "This is not about being slow. It is about being clear. When you are clear, you move with more power and less fatigue. You are no longer carrying the weight of the whole day on your shoulders; you are only carrying the weight of this single, beautiful moment." },
      { type: "divider" },
      { type: "paragraph", text: "Try it today. Between your next two tasks, pause. Close the laptop. Set down the phone. Do not look at anything. Breathe once, deeply. Let the past moment dissolve. Then, open your eyes and begin." },
    ],
  },
  "digital-minimalism-in-a-loud-world": {
    title: "Digital Minimalism in a Loud World",
    date: "July 2026",
    category: "Intentional Living",
    lead: "Creating a sacred container for your mind in an age of constant connectivity.",
    content: [
      { type: "paragraph", text: "We do not notice the digital noise because it has become the atmosphere. We live inside it. The constant buzz of notifications, the infinite scroll of feeds, the low-key urgency of updates. Our brains were not designed for this level of input. We are constantly scanning, reacting, and processing information that has no bearing on our immediate physical reality." },
      { type: "paragraph", text: "Digital minimalism is not about hating technology. It is about loving your attention. It is the realization that your focus is your life, and when you give it away to every notification, you are giving away your days. Reclaiming it requires more than willpower; it requires design." },
      { type: "subheading", text: "Designing a Quiet Screen" },
      { type: "paragraph", text: "The first step is to change the environment. I turned off all non-human notifications. If a real person is not trying to reach me, my phone has no permission to interrupt me. The news apps, the shopping alerts, the social platforms—they are all silent now. They wait for me to open them, rather than calling out for my attention." },
      { type: "paragraph", text: "I also moved my social apps off the home screen and into folders. By adding a small amount of friction—an extra swipe, a search—I broke the habit of mindless tapping. If I want to scroll, I have to make a conscious choice to find the app. That small pause is often enough to make me ask: do I really want to do this, or am I just looking for an exit?" },
      { type: "quote", text: "Your attention is your life. What you give it to is what you become. Choose to give it to the world in front of you." },
      { type: "subheading", text: "Reclaiming the Offline Self" },
      { type: "paragraph", text: "When we clear the digital noise, we find a quiet space that can be uncomfortable at first. We are used to being constantly stimulated. Boredom feels like an emergency. But on the other side of that discomfort is a deeper kind of presence." },
      { type: "paragraph", text: "We begin to read books again, letting our minds sink into long paragraphs without the urge to click a link. We write on paper, feeling the texture of the pen. We walk without headphones, listening to the wind and the traffic and our own thoughts. We remember who we are when we are not being broadcasted to." },
      { type: "divider" },
      { type: "paragraph", text: "You do not need to delete all your accounts to practice digital minimalism. Start by designating a single room or a single hour of your day as device-free. Let that space be sacred. Let it be a place where the world cannot reach you, and see what returns to you in the silence." },
    ],
  },
  "finding-ritual-in-the-kitchen": {
    title: "Finding Ritual in the Kitchen",
    date: "August 2026",
    category: "Rituals",
    lead: "Slowing down the process of nourishment to feed both body and spirit.",
    content: [
      { type: "paragraph", text: "Cooking has largely become a utility. We treat it as a chore, a necessary step between hunger and satisfaction. We buy pre-chopped vegetables, use microwave meals, or order delivery to save time. And while there is a place for convenience, we lose something vital when we completely outsource the preparation of our food." },
      { type: "paragraph", text: "When we slow down in the kitchen, we turn a daily task into a rich sensory ritual. Cooking is one of the few activities that naturally engages all five of our senses. It is a somatic invitation to return to the physical world, to feel the textures, smell the aromas, and watch the transformation of raw ingredients into a nourishing meal." },
      { type: "subheading", text: "Sensing the Ingredients" },
      { type: "paragraph", text: "I have started treating chopping as a form of meditation. Instead of rushing to get the vegetables into the pan, I pay attention to the sound of the knife on the wooden board. I feel the cool skin of the cucumber, notice the bright orange of the carrots, smell the sharp oil of the garlic as it hits the board. These details are not distractions; they are the point." },
      { type: "paragraph", text: "When we cook with attention, we are practicing active presence. We cannot chop onions safely while thinking about our inbox. The kitchen demands our presence, and in return, it gives us a break from our worries. It grounds us in the physical laws of heat, time, and chemistry." },
      { type: "quote", text: "When we prepare food with care, we are practicing a ancient form of love. We are telling ourselves, and those we feed, that our nourishment is worth our time." },
      { type: "subheading", text: "The Grace of Preparation" },
      { type: "paragraph", text: "The time spent cooking is a transition from the busy energy of the day to the receptive energy of eating. By cooking slowly, we prepare our nervous system to digest. We smell the food, which signals our body to start producing digestive enzymes. We arrive at the table calm, rather than rushed." },
      { type: "paragraph", text: "It is not about making complicated, gourmet meals. A simple bowl of soup, prepared with intention and eaten in quiet, is infinitely more nourishing than a fancy dinner eaten in front of a screen. The magic is in the attention, not the recipe." },
      { type: "divider" },
      { type: "paragraph", text: "This week, choose one meal to cook with absolute focus. Turn off the podcast, put the phone in another room, and let the sounds of the kitchen be your music. Feel the warmth of the stove, smell the steam, and eat with appreciation. Notice how the food tastes when you helped it arrive." },
    ],
  },
  "the-gentle-discipline-of-saying-no": {
    title: "The Gentle Discipline of Saying No",
    date: "September 2026",
    category: "Intentional Living",
    lead: "Why protecting your time is the most honest act of self-care.",
    content: [
      { type: "paragraph", text: "For a long time, saying no felt like a failure. It felt like admitting I was not strong enough, capable enough, or generous enough to handle everything. I said yes to projects I did not have time for, social events that exhausted me, and obligations that left me feeling resentful. I believed I was being kind, but I was actually practicing avoidance." },
      { type: "paragraph", text: "The truth is that every yes is a no to something else. When you say yes to another meeting, you are saying no to the quiet hour you needed to think. When you say yes to a social commitment out of guilt, you are saying no to the rest your body is begging for. Saying yes to everything means saying yes to nothing fully." },
      { type: "subheading", text: "The Anatomy of a Gentle No" },
      { type: "paragraph", text: "Learning to say no gently is a practice in self-respect. It does not require anger or defensiveness. A gentle no is simple, clear, and kind. It does not need to be wrapped in long excuses or stories. The moment we start over-explaining, we suggest that our boundary is up for negotiation." },
      { type: "paragraph", text: "I have learned to say: 'Thank you for thinking of me, but I don't have the capacity for this right now.' Or simply: 'I'm sorry, I can't make that work.' Most people are respectful of boundaries when they are stated clearly. They are not looking for an explanation; they are just looking for an answer." },
      { type: "quote", text: "A boundary is not a wall to keep people out. It is a door that you get to choose when to open. It keeps you safe so you can love fully." },
      { type: "subheading", text: "Cultivating Spaciousness" },
      { type: "paragraph", text: "When we practice saying no, our lives begin to have margins. We have empty spaces in our calendars that are not waiting to be filled. We have evenings with no plans, weekends with no schedules, afternoons where we can decide in the moment what we need." },
      { type: "paragraph", text: "This spaciousness is where creativity lives. It is where deep rest happens. It is where we find the energy to say a wholehearted, joyful yes to the things that truly matter. We are no longer living from obligation; we are living from choice." },
      { type: "divider" },
      { type: "paragraph", text: "Look at your calendar for the coming week. Identify one commitment that feels heavy, one thing you said yes to out of guilt. Ask yourself if you can gently release it. Speak the truth kindly. See how much lighter the week feels when you reclaim your yes." },
    ],
  },
  "cultivating-a-mindful-workspace": {
    title: "Cultivating a Mindful Workspace",
    date: "October 2026",
    category: "Mindfulness",
    lead: "How a more intentional desk can lead to a more centered mind.",
    content: [
      { type: "paragraph", text: "Our workspaces are often a reflection of our internal states. A desk piled high with papers, old mugs, tangled cords, and scattered notes is not just physical clutter; it is a visual reminder of everything unfinished. It pulls at our attention, whispering of tasks we have neglected and decisions we have postponed." },
      { type: "paragraph", text: "Creating a mindful workspace is not about achieving a magazine-perfect minimalist look. It is about creating a supportive environment for your mind. It is about choosing what you look at, what you touch, and how you feel when you sit down to do your work." },
      { type: "subheading", text: "Clearing the Physical Field" },
      { type: "paragraph", text: "I start my workday with a clean surface. Only the tools I need for the immediate task are on my desk. The notebook, the pen, the computer, the cup of tea. Everything else is put away. This simple boundary tells my brain that it is time to focus, reducing the visual noise that triggers distractions." },
      { type: "paragraph", text: "I also like to bring elements of the natural world to my desk. A small green plant, a stone from a favorite beach, a window that lets in natural light. These reminders of the organic world help to soften the hard edges of technology. They remind me of a slower, gentler pace." },
      { type: "subheading", text: "Mental Boundaries at Work" },
      { type: "paragraph", text: "A mindful workspace also requires mental boundaries. I practice single-tasking, closing all browser tabs except the one I am working on. I take structured breaks, standing up to stretch or step outside for a few minutes instead of scrolling social media at my desk." },
      { type: "paragraph", text: "At the end of the day, I practice a closing ritual. I wash my tea mug, file away my papers, and write down my priorities for the next morning. When I clear the desk at the end of the day, I am clearing my mind. I am saying: the work is done, and now I can rest." },
      { type: "quote", text: "Your desk is the canvas of your attention. Keep it clear, keep it simple, and let it be a place where you can breathe." },
      { type: "divider" },
      { type: "paragraph", text: "Before you close your computer today, take five minutes to clean your workspace. Put away the clutter, wipe the surface, and leave it ready for tomorrow. Notice the difference in your energy when you sit down to a clean canvas in the morning." },
    ],
  },
  "the-art-of-doing-nothing": {
    title: "The Art of Doing Nothing",
    date: "May 2026",
    category: "Mindfulness",
    lead: "On the radical act of stillness in a world that rewards constant motion.",
    content: [
      { type: "paragraph", text: "There is a particular kind of guilt that comes with stillness. The feeling that if you are not producing, planning, or progressing, you are falling behind. For most of my life, I carried that guilt like a backpack I forgot I was wearing. It shaped how I spent my mornings, how I spent my evenings, and the anxious hum that filled the space between." },
      { type: "paragraph", text: "I did not discover rest. I collapsed into it. There came a point where the doing simply could not continue, where my body made the decision my mind refused to make. And in that forced pause, something unexpected happened: I began to feel like myself again." },
      { type: "subheading", text: "The Guilt of Being Still" },
      { type: "paragraph", text: "We live in a culture that treats busyness as a badge of honor. The question \"what do you do?\" is never really about your job. It is about your worth. And so we fill every gap. We listen to podcasts while walking, reply to emails while eating, scroll while waiting for the kettle to boil. The spaces that were once simply empty have been colonized by productivity." },
      { type: "paragraph", text: "The first time I sat down with nothing to do on purpose, the discomfort was physical. My hands needed something. My mind raced through lists. Every cell wanted to reach for the phone, the notebook, the next task. It felt like withdrawal, because in many ways, it was." },
      { type: "quote", text: "Doing nothing is not laziness. It is one of the bravest things you can do in a culture that measures your worth by your output." },
      { type: "subheading", text: "What Happens in the Nothing" },
      { type: "paragraph", text: "When you finally stop, something shifts. Not immediately. Not dramatically. But slowly, like fog lifting. You begin to hear your own thoughts again, the ones that live beneath the noise. You notice sensations you had been overriding for months. The tension in your shoulders. The shallow pattern of your breathing. The fatigue you had been calling motivation." },
      { type: "paragraph", text: "In the nothing, there is room. Room for feelings to surface. Room for ideas that do not arrive on schedule. Room for the kind of rest that sleep alone cannot provide. The mind needs fallow time the way soil needs a season without crops. Not because it is broken, but because that is how renewal works." },
      { type: "subheading", text: "A Practice, Not a Performance" },
      { type: "paragraph", text: "I want to be careful here. Doing nothing is not another thing to optimize. It is not a technique with measurable outcomes. The moment you start tracking your stillness or grading your rest, you have turned it back into work." },
      { type: "paragraph", text: "Start small. Five minutes of sitting with no phone, no book, no agenda. Notice what comes up. The restlessness, the urge to check something, the quiet voice that says you should be doing more. Let it all pass. You do not need to fix any of it. You are practicing presence, and presence does not have a goal." },
      { type: "divider" },
      { type: "paragraph", text: "There is a Japanese concept called ma, which refers to the space between things. The pause in music that gives the notes their meaning. The empty room that makes the architecture breathe. Ma is not absence. It is the thing that makes everything else possible." },
      { type: "paragraph", text: "That is what doing nothing is. Not the absence of living, but the space that gives your life its shape." },
    ],
  },
  "morning-rituals-that-anchor-me": {
    title: "Morning Rituals That Anchor Me",
    date: "April 2026",
    category: "Rituals",
    lead: "How a handful of small, repeatable acts turned the first hour of my day into something I look forward to.",
    content: [
      { type: "paragraph", text: "The morning used to be a race. Alarm, scroll, coffee, rush. I moved through it like something to survive rather than something to savor. Most days, I was already behind before my feet touched the floor. The phone told me so. Messages waiting, news breaking, the world already spinning without me." },
      { type: "paragraph", text: "I do not remember the exact day I decided to change it. There was no revelation, no crisis. Just a growing awareness that the way I started the day was poisoning the rest of it. If the first thing I felt each morning was urgency, how could I expect the hours that followed to feel any different?" },
      { type: "subheading", text: "The First Hour" },
      { type: "paragraph", text: "My morning ritual is simple. That is the point. It is not a wellness routine. It is not a protocol. It is a collection of small, gentle acts that help me arrive in the day instead of being dragged into it." },
      { type: "paragraph", text: "A glass of water before anything else. Not because I read it in a health article, but because my body asks for it, and for years I was not listening. Then a few minutes of stillness. Not meditation, necessarily. Just sitting. Feeling the weight of my body in the chair. Hearing the sounds of the house before it wakes." },
      { type: "paragraph", text: "Then something warm. Tea in winter, sometimes just warm water with lemon in summer. Held with both hands. There is something about wrapping your palms around a warm cup that tells your nervous system it is safe. A signal older than language." },
      { type: "quote", text: "The ritual matters less than the intention behind it. Find the small act that makes you feel like yourself before the world asks you to be anything else." },
      { type: "subheading", text: "What I Stopped Doing" },
      { type: "paragraph", text: "Changing the morning was as much about subtraction as addition. I stopped reaching for my phone in the first thirty minutes. This was the hardest change and the most transformative. Without the phone, the morning belongs to me. With it, the morning belongs to everyone else." },
      { type: "paragraph", text: "I stopped setting an alarm with a harsh sound. I stopped trying to be productive before breakfast. I stopped treating the morning like a runway, a brief acceleration before takeoff. The morning is not preparation for the day. It is part of the day. Maybe the most important part." },
      { type: "subheading", text: "Why Consistency Matters More Than Perfection" },
      { type: "paragraph", text: "Some mornings the ritual lasts forty-five minutes. Some mornings it is ten. Some mornings I skip most of it and that is fine. The point is not to perform it perfectly. The point is to have something to return to. An anchor, not a cage." },
      { type: "paragraph", text: "Consistency is not rigidity. It is familiarity. When the morning ritual becomes familiar, it becomes a place of comfort. A threshold you cross that says: today, I am choosing to be present. Whatever comes after, I began with intention." },
      { type: "divider" },
      { type: "paragraph", text: "If you are reading this and your mornings feel chaotic, know that you do not need to overhaul everything at once. Start with one thing. One small act that is yours before the world starts asking. That is enough. That is the whole practice." },
    ],
  },
  "letting-go-of-perfect": {
    title: "Letting Go of Perfect",
    date: "March 2026",
    category: "Reflections",
    lead: "What I found on the other side of perfectionism was not mediocrity. It was freedom.",
    content: [
      { type: "paragraph", text: "Perfectionism told me it was ambition. It wore the mask of high standards and attention to detail. For years, I believed it was my greatest strength, the thing that set me apart, the engine behind every accomplishment. It took a long time to see what it actually was: fear wearing a costume." },
      { type: "paragraph", text: "Fear of being seen as less than. Fear of getting it wrong. Fear of not being enough. Perfectionism does not drive you toward excellence. It drives you away from vulnerability. And vulnerability is where all the real things live." },
      { type: "subheading", text: "The Cost of Flawless" },
      { type: "paragraph", text: "The problem with perfect is that it never arrives. There is always another revision, another comparison, another reason to delay. I spent years rewriting emails that were already fine. Rehearsing conversations that did not need rehearsal. Holding back ideas because they were not fully formed. The work was never ready because ready meant perfect, and perfect meant never." },
      { type: "paragraph", text: "Perfectionism also has a cost that nobody talks about: it makes you boring. When you are afraid to be wrong, you stop taking risks. When you are afraid to be messy, you stop experimenting. The most interesting things I have ever made were the ones I almost did not share because they felt too raw, too rough, too honest." },
      { type: "quote", text: "Perfectionism does not produce great work. It produces exhaustion. And it keeps the most honest parts of you locked away." },
      { type: "subheading", text: "How Letting Go Actually Happened" },
      { type: "paragraph", text: "Letting go did not happen overnight. It started with small acts of imperfection. Sending the email that was good enough. Sharing the thought that was not fully formed. Allowing the messy draft to exist without judgment. Publishing the piece with the sentence I could not quite get right." },
      { type: "paragraph", text: "Each small act of imperfection was terrifying. And each time, nothing terrible happened. The world did not end. People did not recoil. In fact, the opposite: the imperfect things often landed better than the polished ones. They had something the polished ones lacked. They had warmth. They had texture. They had me in them." },
      { type: "subheading", text: "Good Enough Is Not Settling" },
      { type: "paragraph", text: "There is a crucial distinction between good enough and careless. Good enough means you have done honest work. You have given it your attention and care. You have simply stopped before the diminishing returns of the seventh revision. Good enough is not settling. It is wisdom." },
      { type: "paragraph", text: "Carelessness is indifference. Good enough is discernment. It is the ability to say: this is ready, even if I can still see the seams. The seams are not flaws. They are proof that a human made this. And that is exactly what the world needs more of." },
      { type: "divider" },
      { type: "paragraph", text: "If perfectionism is a voice in your head, I want you to know that you can turn down the volume. Not all at once. But one imperfect act at a time. Send the thing. Share the thought. Let the draft be messy. What you will find on the other side is not mediocrity. It is the freedom to be human. And that is worth more than flawless." },
    ],
  },
  "the-quiet-power-of-a-slow-morning": {
    title: "The Quiet Power of a Slow Morning",
    date: "February 2026",
    category: "Intentional Living",
    lead: "What happens when you stop rushing through the first hours and let them unfold at their own pace.",
    content: [
      { type: "paragraph", text: "Speed has become the default. We wake up and immediately accelerate, pulled forward by alarms and notifications and the low hum of everything that was waiting while we slept. The morning is treated as a loading screen, a brief buffer before the real day begins. But what if the morning is not a prelude? What if it is the thing itself?" },
      { type: "paragraph", text: "I spent years trying to win the morning. Waking earlier, stacking habits, optimizing the first ninety minutes for maximum output. Every productivity article said the same thing: own the morning, own the day. So I turned the dawn into a sprint and wondered why I felt exhausted by noon." },
      { type: "subheading", text: "Reclaiming the Pace" },
      { type: "paragraph", text: "A slow morning is not lazy. It is deliberate. It is the choice to move at the speed of attention rather than the speed of anxiety. When you slow down, you do not fall behind. You arrive differently. You arrive in your body instead of your head." },
      { type: "paragraph", text: "There is no formula. Some mornings it is tea and silence. Others it is a walk around the block before the neighborhood wakes. Sometimes it is just standing at the window for a minute longer than necessary, watching the light change. The point is not the activity. It is the refusal to hurry." },
      { type: "quote", text: "When you move slowly on purpose, you notice things. The light through the window. The warmth of the cup. The simple fact that you are alive and here." },
      { type: "subheading", text: "What You Notice When You Stop Rushing" },
      { type: "paragraph", text: "The first thing I noticed was sound. Without the urgency, I could hear the birds. I could hear the house settling. I could hear my own breathing. These are not new sounds. They were always there. I was just moving too fast to catch them." },
      { type: "paragraph", text: "The second thing was texture. The weight of the blanket when I first sit up. The cool of the floor under my feet. The way hot water pours differently than cold. These details sound small because they are. But small is where life actually happens. The big moments are rare. The small ones are constant. And if you are rushing through them, you are rushing through your life." },
      { type: "subheading", text: "The Ripple Effect" },
      { type: "paragraph", text: "Here is what I did not expect: the slow morning does not just change the morning. It changes the way you meet the first challenge. It changes the way you respond to the first email. It changes the baseline of your nervous system so that when the day does accelerate, and it will, you are starting from a calmer place." },
      { type: "paragraph", text: "I do not have proof of this. I cannot cite a study. I can only tell you what I have observed in my own life: when the morning is gentle, I am gentler. When the morning is rushed, I carry that rush into everything." },
      { type: "divider" },
      { type: "paragraph", text: "You do not need to wake up earlier to have a slow morning. You need to do less in it. Subtract one thing. Delay one habit. Give yourself ten minutes with no purpose. That is the beginning. And the beginning is always enough." },
    ],
  },
  "breathing-through-the-overwhelm": {
    title: "Breathing Through the Overwhelm",
    date: "January 2026",
    category: "Mindfulness",
    lead: "When everything is too much, the simplest tool is the most powerful one you have.",
    content: [
      { type: "paragraph", text: "Overwhelm does not announce itself politely. It builds quietly, layering one small thing on top of another until suddenly everything is too much. The inbox. The decisions. The conversations you need to have. The ones you are avoiding. It is not that any single thing is unbearable. It is the accumulation. It is the weight of all of it at once." },
      { type: "paragraph", text: "I used to fight overwhelm with force. More lists. More structure. A tighter grip on the schedule. But overwhelm is not a planning problem. It is a nervous system problem. And you cannot organize your way out of a body that is screaming for pause." },
      { type: "subheading", text: "Three Breaths" },
      { type: "paragraph", text: "I have learned that in those moments, the simplest tool is the most powerful. Three breaths. Not deep, dramatic breaths. Not the kind you see in guided meditations with ocean sounds. Just slow, intentional breaths. In through the nose. Out through the mouth. Each exhale slightly longer than the inhale." },
      { type: "paragraph", text: "Three breaths takes about thirty seconds. That is all. And in those thirty seconds, something shifts. Not everything. You do not emerge enlightened. The inbox is still full. The decisions still wait. But the space between you and the overwhelm widens just enough for clarity to slip through." },
      { type: "quote", text: "The breath is always available. It asks nothing of you except your attention. And sometimes, that is exactly enough to shift the entire shape of a moment." },
      { type: "subheading", text: "Why the Breath Works" },
      { type: "paragraph", text: "When you are overwhelmed, your breathing is shallow and fast. Your body is in a mild state of alarm. It does not know the difference between a full inbox and a physical threat. The signals are the same: cortisol, tension, the impulse to fight or flee." },
      { type: "paragraph", text: "A slow exhale activates the parasympathetic nervous system. It tells your body, in the only language it understands, that you are safe. Not that everything is fine. Not that the stress is imaginary. Just that right now, in this breath, you are okay. And okay is enough to think clearly again." },
      { type: "subheading", text: "The Space Between" },
      { type: "paragraph", text: "Viktor Frankl wrote that between stimulus and response, there is a space. And in that space lies our freedom. The breath is how I find that space. Without it, I am reactive. I reply too fast. I say yes when I mean no. I make decisions from panic rather than presence." },
      { type: "paragraph", text: "With three breaths, I do not eliminate the stress. I create a gap. A pause between the feeling and the action. And in that pause, I can choose. I can respond instead of react. I can prioritize instead of scramble. I can be honest about what I need instead of performing capability." },
      { type: "divider" },
      { type: "paragraph", text: "The next time you feel the wave coming, try this: stop. Do not reach for a tool or a fix. Just breathe. Three times. Slowly. Notice what changes. It will not be dramatic. It will be subtle. But subtle is all you need. Subtle is the difference between drowning and floating." },
    ],
  },
  "seasonal-living-as-practice": {
    title: "Seasonal Living as Practice",
    date: "December 2025",
    category: "Rituals",
    lead: "Aligning your rhythms with the natural world is one of the gentlest forms of self-care I know.",
    content: [
      { type: "paragraph", text: "We live in artificial constancy. The same temperature in every room. The same light at every hour, courtesy of screens and overhead fixtures. The same pace expected of us in January as in July. Modern life has severed us from the rhythms that governed human existence for millennia, and we pretend not to notice." },
      { type: "paragraph", text: "But our bodies notice. We feel the pull of shorter days, even if we ignore it. We feel the restlessness of spring, even if we channel it into work. We are still animals, still tuned to the turning of the earth. And when we live as if the seasons do not exist, something in us goes quietly out of balance." },
      { type: "subheading", text: "Winter: The Permission to Rest" },
      { type: "paragraph", text: "Winter asks us to slow down, and we refuse. We schedule just as many meetings. We exercise with the same intensity. We expect the same energy from ourselves at five o'clock darkness as at nine o'clock light. And then we call ourselves lazy when we cannot keep up." },
      { type: "paragraph", text: "What if winter is not a season to push through but a season to lean into? What if the tiredness is not a flaw but a signal? The natural world goes dormant in winter. Seeds rest. Trees pull their energy inward. Nothing is growing, and nothing is supposed to be. Imagine what it would feel like to give yourself that same permission." },
      { type: "subheading", text: "Spring: Beginning Gently" },
      { type: "paragraph", text: "Spring is not an explosion. It is a slow unfolding. The first green is tentative, fragile, easily overlooked. And yet we treat spring like a starting gun. New Year's resolutions have failed by now, so spring becomes the second chance, another burst of ambition and overcommitment." },
      { type: "paragraph", text: "But look at how spring actually works. It does not arrive all at once. It sends signals. A warmer afternoon. A single bud. A bird you have not heard in months. Spring teaches patience. It teaches you to begin before you are ready, but gently. Not with force. With curiosity." },
      { type: "quote", text: "When you live in tune with the seasons, you stop fighting your own nature. You stop expecting constant summer. And in that acceptance, you find a gentler way to move through the year." },
      { type: "subheading", text: "Summer: Expansion and Presence" },
      { type: "paragraph", text: "Summer is the season of outward energy. Long days, open windows, the impulse to connect and move and be outside. This is the time for expansion. For saying yes. For the projects that need momentum and the conversations that need space." },
      { type: "paragraph", text: "But even summer has its lesson in balance. The long days are an invitation, not an obligation. You do not have to fill every hour of light. Some of the best summer moments are the ones where nothing happens at all. An afternoon on the grass. The sound of evening through an open window. Presence, not productivity." },
      { type: "subheading", text: "Autumn: The Practice of Release" },
      { type: "paragraph", text: "Autumn is the most instructive season for the practice of letting go. Watch the trees. They do not cling to their leaves. They do not grieve what is falling. They release. And in that release, they prepare for what comes next." },
      { type: "paragraph", text: "What could you release this autumn? A commitment that no longer serves you. A belief about yourself that you have outgrown. A habit that once helped but now just occupies space. Autumn is not about loss. It is about making room. And the room is always for something better." },
      { type: "divider" },
      { type: "paragraph", text: "Seasonal living is not a system. There are no rules. It is simply the practice of paying attention to the world outside your window and asking: what is this season inviting me to do? And then, as much as your life allows, honoring the answer." },
    ],
  },
  "the-weight-of-being-available": {
    title: "The Weight of Being Available",
    date: "November 2025",
    category: "Intentional Living",
    lead: "On the quiet exhaustion of a life with no boundaries between reachable and resting.",
    content: [
      { type: "paragraph", text: "There was a time, not long ago, when being unreachable was the default. You left the house and you were gone. People could not find you, and no one thought that was strange. Now, being unreachable is a statement. It requires explanation. It requires courage." },
      { type: "paragraph", text: "I did not realize how heavy constant availability had become until I put my phone in a drawer for a Saturday. Not lost. Not dead. Just away. The first hour was uncomfortable. The second was boring. By the third, something in my chest loosened that I did not know was tight." },
      { type: "subheading", text: "The Invisible Tax" },
      { type: "paragraph", text: "Every notification carries a micro-decision. Read or ignore. Respond or defer. Each one is small. But they accumulate. By the end of a typical day, you have made hundreds of tiny choices about other people's needs, and you have made them in the spaces that were supposed to be yours. The gaps between tasks. The walk to the kitchen. The last minutes before sleep." },
      { type: "paragraph", text: "This is the invisible tax of availability. It is not any single interruption. It is the knowledge that an interruption could come at any moment. That awareness alone keeps part of your attention permanently allocated. You are never fully resting, never fully present, because part of you is always on call." },
      { type: "quote", text: "Being reachable is not the same as being available. You can be both connected and protected. The boundary is not a wall. It is a door that you get to open and close." },
      { type: "subheading", text: "Choosing When to Disappear" },
      { type: "paragraph", text: "I have started building pockets of unavailability into my days. Not dramatic off-grid retreats. Just small windows where the phone is in another room and the notifications are paused. An hour in the morning. The last hour before bed. Sunday afternoons." },
      { type: "paragraph", text: "The people in my life adjusted faster than I expected. Nobody panicked. Nobody felt abandoned. What happened instead was that the time I did give them became better. More present, more generous, more real. Availability is not the same as quality. In fact, they are often inversely related." },
      { type: "subheading", text: "Rest Requires Boundaries" },
      { type: "paragraph", text: "You cannot rest while remaining available. This is the truth that took me years to accept. Rest is not just the absence of work. It is the absence of demand. And as long as the phone is within reach and the world has permission to interrupt, you are not resting. You are waiting." },
      { type: "paragraph", text: "Boundaries are not selfish. They are the infrastructure of a sustainable life. A life where you can give fully because you have held something back for yourself. Not from scarcity, but from wisdom." },
      { type: "divider" },
      { type: "paragraph", text: "If constant availability has become your default, you do not need to overhaul it overnight. Start with one pocket. One hour. One drawer. And notice what fills the space when the buzzing stops. It might be boredom at first. Stay with it. On the other side of boredom, there is something that has been waiting for you: your own attention." },
    ],
  },
  "what-i-mean-when-i-say-gentle": {
    title: "What I Mean When I Say Gentle",
    date: "October 2025",
    category: "Reflections",
    lead: "Gentleness is not weakness. It is the strongest way I know to move through a hard world.",
    content: [
      { type: "paragraph", text: "I use the word gentle a lot. In these pages, in my own self-talk, in the way I try to move through difficult moments. And I know how it sounds. Gentle can seem soft, passive, even naive. In a world that rewards toughness and resilience and pushing through, gentleness looks like giving up." },
      { type: "paragraph", text: "But that is not what gentleness is. Not the kind I mean." },
      { type: "subheading", text: "Gentleness as Honesty" },
      { type: "paragraph", text: "To be gentle with yourself is to be honest. It is to look at your fatigue and call it what it is, instead of calling it laziness. To look at your anxiety and name it, instead of pushing it under a to-do list. To look at your grief and let it exist, instead of performing strength." },
      { type: "paragraph", text: "Toughness is often just avoidance in a louder voice. I can handle this. I do not need help. It is fine. These are not strong statements. They are walls. Gentleness tears down those walls, not with force, but with the quiet admission that you are human and that being human is hard." },
      { type: "quote", text: "Gentleness is not the absence of strength. It is strength that does not need to prove itself." },
      { type: "subheading", text: "Gentleness with Others" },
      { type: "paragraph", text: "When I am gentle with myself, I become gentler with everyone around me. This is not a theory. It is something I have watched happen in real time. On the days when I berate myself for being behind, I am sharper with the people I love. On the days when I give myself room to be imperfect, I give them the same room." },
      { type: "paragraph", text: "Gentleness radiates. It is not something you practice in isolation. The way you speak to yourself in the mirror is the same voice you will use with your partner, your child, the stranger who makes a mistake. The inner dialogue always leaks outward." },
      { type: "subheading", text: "The Hard Parts" },
      { type: "paragraph", text: "I will not pretend gentleness is easy. It is not. Some days, the critical voice is louder. Some days, I fall back into old patterns of pushing, shaming, demanding more from myself than is reasonable. Gentleness is not a state you achieve. It is a direction you keep choosing." },
      { type: "paragraph", text: "And it takes more courage than toughness ever did. Because to be gentle is to be vulnerable. To be vulnerable is to risk. And to risk is to be alive in the fullest sense of the word." },
      { type: "divider" },
      { type: "paragraph", text: "When I say be gentle, I am not saying be passive. I am saying: meet yourself where you are. Speak to yourself the way you would speak to someone you love. Let the hard things be hard without adding judgment on top. That is the practice. That is what I mean." },
    ],
  },
  "learning-to-sit-with-discomfort": {
    title: "Learning to Sit with Discomfort",
    date: "September 2025",
    category: "Mindfulness",
    lead: "The urge to fix, flee, or distract is strong. But some feelings just need a witness.",
    content: [
      { type: "paragraph", text: "We are taught, in a thousand subtle ways, that discomfort is a problem to be solved. Feel anxious? Try this app. Feel sad? Here is a list of ten things. Feel bored? The entire internet is one tap away. Every uncomfortable emotion has been paired with an escape route, and we have gotten very fast at taking it." },
      { type: "paragraph", text: "I was an expert escape artist. Not with anything dramatic. Just the small, constant exits. The phone when I felt lonely. The snack when I felt restless. The new project when I felt the weight of the unfinished one. I could pivot away from discomfort so quickly I barely knew I was doing it." },
      { type: "subheading", text: "The Escape and Its Cost" },
      { type: "paragraph", text: "Every time you flee a feeling, you confirm the belief that you cannot handle it. The escape is relief in the moment and erosion over time. Your window of tolerance narrows. Your confidence in your own resilience shrinks. You start to believe that you need the distraction, the fix, the exit. And the discomfort, which was always temporary, starts to feel permanent." },
      { type: "paragraph", text: "The feelings you avoid do not go away. They wait. They show up in your body as tension. In your relationships as distance. In your sleep as restlessness. The only way out is through, and through means sitting still when every instinct says run." },
      { type: "quote", text: "Some feelings do not need to be fixed. They need to be witnessed. And sometimes, you are the only witness they will ever have." },
      { type: "subheading", text: "What Sitting Looks Like" },
      { type: "paragraph", text: "Sitting with discomfort does not mean wallowing. It does not mean indulging in suffering or refusing to take action when action is needed. It means pausing before the escape. It means noticing the feeling before reaching for the fix." },
      { type: "paragraph", text: "When I feel the pull toward distraction now, I try to name what is underneath it. Usually it is something simple. I am tired. I am afraid. I feel alone. The feeling, once named, loses some of its power. Not all of it. But enough to breathe." },
      { type: "subheading", text: "Building the Muscle" },
      { type: "paragraph", text: "Like any practice, this one gets easier with repetition. The first time you sit with anxiety instead of scrolling past it, the anxiety might get louder. That is normal. You have been ignoring it for a long time, and now you are paying attention. It has a lot to say." },
      { type: "paragraph", text: "But over time, something shifts. You learn that discomfort is not dangerous. That sadness passes. That boredom has a floor. That you are more capable of feeling than you thought. And on the other side of that learning is a kind of freedom that no distraction can offer." },
      { type: "divider" },
      { type: "paragraph", text: "You do not have to start big. The next time you reach for your phone out of restlessness, pause. Put it down. Wait thirty seconds. Notice what you feel. That is it. That is the whole exercise. And thirty seconds of presence is worth more than an hour of escape." },
    ],
  },
  "the-myth-of-balance": {
    title: "The Myth of Balance",
    date: "August 2025",
    category: "Intentional Living",
    lead: "What if balance is not a state to achieve but a conversation to keep having?",
    content: [
      { type: "paragraph", text: "For years, I chased balance like it was a destination. A place where work and rest coexisted in perfect proportion. Where I gave enough to everyone, including myself. Where the schedule was full but not frantic, productive but not punishing. I imagined that balanced people had figured something out that I had not, and if I just tried harder or planned better, I would arrive there too." },
      { type: "paragraph", text: "I never arrived. Not once. And eventually, I stopped believing the destination existed at all." },
      { type: "subheading", text: "The Problem with the Metaphor" },
      { type: "paragraph", text: "Balance implies a scale. Two sides, equal weight, perfect stillness. But life is not a scale. Life is a river. It moves. The current shifts. Some weeks, work takes everything. Some weeks, a relationship needs all of you. Some weeks, your body demands rest that nothing else can negotiate away." },
      { type: "paragraph", text: "Trying to keep the scale level means resisting the natural movement of your life. It means saying no to the season that needs more of you because you have already allocated your attention according to some imaginary ideal. That is not balance. That is rigidity." },
      { type: "quote", text: "Balance is not a state to achieve. It is a conversation to keep having. With yourself, with your needs, with the season you are in." },
      { type: "subheading", text: "What I Practice Instead" },
      { type: "paragraph", text: "I have replaced the word balance with the word attention. Instead of asking am I balanced, I ask what needs my attention right now. The answer is different every day. Sometimes it is work. Sometimes it is rest. Sometimes it is a relationship I have been neglecting. Sometimes it is a boundary I have been ignoring." },
      { type: "paragraph", text: "Attention is not equal distribution. It is honest distribution. It means giving more where more is needed and trusting that the other areas will be there when you return. This feels reckless if you have been trained on the balance model. But it is actually more responsive, more alive, more true to how life actually works." },
      { type: "subheading", text: "Letting Go of Guilt" },
      { type: "paragraph", text: "The hardest part of abandoning balance is the guilt. If I rest today, I should have worked. If I work late, I should have rested. The balance mindset turns every choice into a deficit somewhere else. You can never do the right thing because doing one thing means not doing another." },
      { type: "paragraph", text: "But what if there is no deficit? What if this week is a work week and that is fine? What if next month is a rest month and that is also fine? What if the guilt is not wisdom but habit, and you can let it go the same way you would let go of any belief that no longer serves you?" },
      { type: "divider" },
      { type: "paragraph", text: "If you are tired of chasing balance, give yourself permission to stop. Ask the simpler question: what do I need right now? And then, as much as you can, honor the answer. That is not balance. It is something better. It is presence." },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) {
    return { title: "Article Not Found" };
  }
  return {
    title: article.title,
    description: article.lead || article.content.find((b) => b.type === "paragraph")?.text.slice(0, 160),
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = ARTICLES[slug];

  if (!article) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <h1>Article not found</h1>
          <Link href="/journal">Back to Journal</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <div className={styles.articleMeta}>
            <span className={styles.category}>{article.category}</span>
            <span className={styles.date}>{article.date}</span>
          </div>
          <h1 className={styles.articleTitle}>{article.title}</h1>
        </header>

        {article.lead && (
          <p className={styles.articleLead}>{article.lead}</p>
        )}

        <div className={styles.articleBody}>
          {article.content.map((block, i) => {
            if (block.type === "paragraph") {
              return <p key={i}>{block.text}</p>;
            }
            if (block.type === "subheading") {
              return <h2 key={i} className={styles.subheading}>{block.text}</h2>;
            }
            if (block.type === "quote") {
              return (
                <div key={i} className={styles.pullQuote}>
                  <p className={styles.pullQuoteText}>{block.text}</p>
                </div>
              );
            }
            if (block.type === "divider") {
              return (
                <div key={i} className={styles.divider}>
                  <span className={styles.dividerDot} />
                  <span className={styles.dividerDot} />
                  <span className={styles.dividerDot} />
                </div>
              );
            }
            return null;
          })}
        </div>

        <footer className={styles.articleFooter}>
          <Link href="/journal" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Journal
          </Link>
          <span className={styles.authorLine}>Written by Nina</span>
        </footer>
      </article>
    </div>
  );
}
