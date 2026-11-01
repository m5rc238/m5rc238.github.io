import json
from pathlib import Path

modules = []


def question(prompt, options, correct, reason, hint):
    return dict(prompt=prompt, options=options, correct=correct, reason=reason, hint=hint)


def exercise(title, brief, tasks, model, review):
    return dict(title=title, brief=brief, tasks=tasks, model=model, review=review)


def module(title, objective, sections, worked, exercises, quiz):
    modules.append(dict(id=len(modules)+1, title=title, objective=objective,
                        minutes="40–60", sections=sections, worked=worked,
                        exercises=exercises, quiz=quiz))


module("Find the decision inside the request",
 "Turn a requested feature or alarming number into a question worth investigating.",
 [
 ['A brief can mix facts, assumptions, and solutions', 'Imagine receiving this fictional request: redesign checkout because 62% of sessions drop off at payment. The dashboard reading is a reported observation. Saying that the interface causes lost orders is an interpretation. Redesigning is a proposed change. Each may deserve attention, but the report alone does not show that the interpretation is right. Keep the original wording so you can examine its reasoning.'],
 ["Find what must be decided", 'Ask what prompted the concern, what changed, why it matters now, who can approve action, and what delay would cost. You might need to decide whether to spend a quarter rebuilding checkout or whether to investigate a payment incident today. Those choices need different levels of confidence. Your first frame can be a question to investigate. You do not need to pretend you already know the user problem.'],
 ['Write a working brief', 'Name the people, situation, concern, intended improvement, and scope: what the work will cover and leave out. Record the evidence and unknowns alongside them. A short paragraph is often more useful than a polished sentence. Revisit the brief when research, prototypes, or changing priorities give you reason to question its assumptions.']
 ],
 'Original request • Add a chatbot because support tickets increased.\nWorking question • Find out which support needs increased and whether customers can resolve them, so we can choose how to respond.\nWhy this helps • Automation, a product repair, clearer information, and staffing remain options until the evidence supports a choice.',
 [
 exercise("Unpack the checkout brief", "The only supplied information is the reported 62% checkout drop and the redesign request.",
 ["Separate the observation, interpretation, assumption, priority, and proposal.", 'State what needs to be decided and three questions whose answers could change that choice.'],
 'Observation • A dashboard reports a rate. Assumptions may include that tracking works, no recorded completion means no order, and people intended to buy. The proposed change is a redesign. The decision may be whether to fund that redesign or investigate another explanation. The business priority still needs a clearer definition.',
 ["I did not treat the cause as known.", "I stated a decision that a person can make.", "My questions could alter the next action."]),
 exercise("Remove the feature from the need", "A director says that customers need an AI onboarding assistant.",
 ["Write two possible needs that could motivate the request.", 'For each, explain why a different approach might help without an AI assistant.'],
 'New administrators may struggle to set permissions correctly. Buyers may need help judging whether the product fits their workflow. Better defaults, clearer documentation, or better product information might help. These are possible needs to investigate, not findings. Ask which specific events led to the request.',
 ['I treated possible needs as ideas to check.', 'I kept more than one possible change open.', "I identified missing evidence."])
 ],
 [
 question("Only a dashboard reports a 62% drop. Which claim is directly supported?", ["62% of people tried and failed to pay.", "The report shows a 62% drop between recorded steps.", "The payment form causes most lost orders.", "Shortening checkout will increase purchases."],1,'A report shows what the system recorded. Intent, causes, and the effects of changes need more evidence.',"Distinguish the reporting system from the behavior it is meant to represent."),
 question("Which statement specifies a decision?", ["Users are confused.", "The screen has ten fields.", "Should we fund a checkout rebuild this quarter?", "We should understand our users better."],2,'Funding a rebuild is a choice someone can make and be responsible for. The other statements offer an interpretation, a count, and a broad wish.',"Look for a choice that could lead to different actions."),
 question('The cause is not known yet. What can a useful brief do?', ['State what to investigate and which decision it will help with.', "Choose the most plausible cause as a fact.", "Delay all action until every cause is known.", "Require a redesign to preserve momentum."],0,'A brief can state what is unknown and which choice depends on it without pretending to know the cause.',"A useful brief can acknowledge what remains unknown.")
 ])

module("Check evidence and measurement",
 'Check what the evidence shows and what remains unknown.',
 [
 ['Define what the numbers measure', 'To understand a rate, you need its denominator, meaning the total it is calculated from. You also need the event definitions, what is being counted, and the time window. A session, person, attempt, and order are different things to count. Someone can fail twice, succeed once, and appear in several sessions. Check whether outside payment providers, delayed events, consent settings, or a return on another device affect the data. Treat these as possibilities to check.'],
 ['Compare carefully', 'A worrying number needs context. Compare relevant periods and groups, allowing for changes in visitors or event tracking. An overall rate can change because the mix of visitors changes, even when behavior within each group stays the same. Split the data into groups when that could change your next action. Avoid searching endless groups until you find an interesting story.'],
 ['Record who and what the evidence covers', 'Record where evidence came from, when it was collected, who it covers, and its known limits. A convenience sample includes cases because they are easy to reach. It can reveal a tracking error without telling you how common the error is among all users. Several reports quoting the same interview still rely on one source. Not finding an expected event tells you little unless your method had a reasonable chance of detecting it.']
 ],
 'Fictional check • Of 20 sessions selected because they were easy to check, 6 were marked as abandoned but link to completed orders.\nSupported • Some apparent exits in this sample were purchases.\nStill unknown • How often this tracking error happens across all users, the true purchase rate, and why people who did not buy left.',
 [
 exercise("Audit a funnel", 'An analyst says that 600 of 1,000 sessions did not record the completion event within 10 minutes.',
 ["Write five checks before calling these 600 failed purchases.", "Name two claims the data cannot support on its own."],
 'Check how events are recorded, how long purchases take, whether sessions can be linked to orders, how retries or multiple sessions are counted, and whether visitor groups are comparable. The number describes missing completion events within a time window. It does not by itself show intent to buy or difficulty with the interface. Choose a longer window only when actual purchasing behavior supports it.',
 ["I checked the denominator and window.", "I separated attempt status from final outcome.", 'I did not infer intent from a recorded event alone.']),
 exercise('Explain a changing overall rate', "Period A has 100 returning visitors at 80% completion and 100 new visitors at 20%. Period B has 50 returning visitors at 80% and 150 new visitors at 20%.",
 ["Calculate each period's overall completion rate.", 'Explain what changed and which causal claim would go beyond the evidence.'],
 'A has 80 + 20 = 100 completions from 200 visitors: 50%. B has 40 + 30 = 70 from 200: 35%. Rates within each group stayed the same. The mix of visitors changed. These counts do not show that an interface change caused the overall decline.',
 ["My calculations use the correct denominator.", "I noticed the change in traffic mix.", "I did not claim the data rule out every interface issue."])
 ],
 [
 question('Six of 20 exits selected because they were easy to check link to orders. What follows?', ["Exactly 30% of all exits are tracking errors.", "Most shoppers cannot pay.", "The remaining 14 were caused by the form.", "Some sampled exits were completed purchases."],3,'The sample reveals a mismatch. How the cases were chosen means you cannot use the rate to describe all sessions or explain the remaining ones.','Finding an issue is different from estimating how common it is.'),
 question("Two reports and a slide deck all cite one interview. How many independent participant accounts are present?", ["Three", "One", "Two", "None"],1,"Repackaging a source does not create independent evidence. There is one underlying participant account.","Trace each claim to its original evidence."),
 question("Which record best supports interpreting a funnel?", ["A screenshot of its headline rate.", "A list of proposed interface changes.", "Event definitions, unit, denominator, period, and known gaps.", "The most senior person's estimate."],2,"Those details let someone inspect what the rate measures. A screenshot, proposal, or estimate cannot replace the definitions.","Ask what another analyst needs to reproduce the interpretation.")
 ])

module("Choose whose outcome matters",
 'Separate claims about what happens from choices about what matters. Explain the trade-offs.',
 [
 ['One business concern can point to several user needs', 'Lost sales matter to a merchant. A shopper might want payment that works, an affordable total, or enough information to decide. Leaving does not by itself mean the shopper experienced a failure. Ask about a specific recent event and what the person was trying to do. People using the same interface can have different goals.'],
 ['Define improvement before choosing a metric', 'A metric should measure something you want to improve. Showing prices earlier may reduce wasted effort while purchases stay the same. More purchases may come with more accidental orders or refunds. State which outcomes take priority, which costs you will watch, and whose interests the choice serves.'],
 ['Evidence helps with priorities but does not choose them for you', "You can investigate when people discover shipping fees and what happens next. Choosing whether to prioritize informed choice, revenue, or staff effort also involves values and permission to decide. Ask who makes the choice and who lives with its consequences. More interviews can clarify people's experiences while leaving a reasonable disagreement about priorities unresolved."]
 ],
 'Fictional alternatives • Help people who want to buy complete payment. Help shoppers assess the total cost. Help support staff resolve payment incidents.\nDifferent measures of success • Completed intended purchases, earlier informed decisions, and less effort resolving problems.\nThese frames can overlap. The team still needs to explain which work it will take on.',
 [
 exercise("Compare outcomes", "A shipping estimator makes people leave earlier. Total purchases stay constant and observed price-checking takes less time.",
 ["Explain a possible user improvement and a business interpretation.", "Name evidence you still need before claiming the change helped all shoppers."],
 'The estimator may help people judge affordability with less effort. Unchanged purchase counts do not show whether revenue benefited or suffered. Check who the observations cover, other user groups, inaccurate estimates, and whether others also save time. An earlier exit alone does not show whether the change helped.',
 ["I distinguished the goals.", "I did not assume every exit is bad.", "I identified possible costs or excluded groups."]),
 exercise("Handle conflicting goals", "Sales wants fewer onboarding questions. Risk operations wants more reliable account information. Applicants want a quick, understandable process.",
 ["Write each perspective fairly.", "Propose one investigation and one decision that evidence alone cannot settle."],
 'Investigate which information affects account quality and where applicants spend effort or make errors. Someone responsible for the decision must explain the acceptable trade-off between speed, reliability, and operating costs. Understand the disagreement before calling it a bias.',
 ["I represented each interest without stereotyping.", 'I separated a question evidence can answer from a choice about priorities.', "I named who needs to decide."])
 ],
 [
 question('Purchases stay the same while shoppers find the total cost earlier and spend less time finding it. Which claim is supported?', ['A user outcome may improve while the purchase rate stays the same.', "The redesign must have failed.", "The business is guaranteed to gain revenue.", "Every shopper now understands all costs."],0,'Helping someone decide sooner with better information can be useful without increasing purchases. It does not guarantee that everyone understands the costs or that revenue increases.',"Consider the shopper's goal as well as the merchant's."),
 question("Which question mainly concerns a priority?", ["When does shipping cost appear?", "How many attempts failed?", 'Which provider recorded the error?', "Whose outcome should this project prioritize?"],3,'Choosing whose outcome takes priority involves values and who has permission to decide. Evidence can help show the consequences.',"Distinguish a measurable event from a choice about what matters."),
 question("Conversion rises, but accidental orders and refunds also rise. What is missing from conversion alone?", ["A larger font.", "The costs and quality of the resulting purchases.", "Proof that the team worked hard.", "A more confident problem statement."],1,"Conversion alone omits whether the purchases were intended and what recovery costs they created.","Ask what undesirable outcomes can accompany the target metric.")
 ])

module("Set boundaries and verify constraints",
 'Understand the wider situation and choose work the team can actually do.',
 [
 ['What you need to understand may exceed what you can change', 'The explanation boundary covers what you need to understand. The intervention boundary covers what you can change, influence, or raise with someone else. A checkout team may need to understand advertising promises and shipping policy even if it controls only checkout. Leaving out an influence because you cannot control it can give you a misleading account.'],
 ['Check constraints that affect your options', 'A constraint is a limit on what you can do. If it changes your options, ask who set it, where it applies, what supports it, and what changing it would cost. Some requirements must be followed for the current decision. Some past choices can be reconsidered. Do not assume every obstacle is fixed or every rule can change. Record what depends on another team or system, and who is responsible.'],
 ['Move between the task and its purpose', 'Abstraction laddering moves between a task and the purpose it serves. Ask why a shorter form matters, then consider other ways to serve that purpose. This is different from asking why someone left, which asks about causes. Broaden the question when doing so could change a decision. Return to actions you can take when broadening it further no longer helps.']
 ],
 "Checkout team • Cannot change delivery fees, but can change when estimates appear.\nWhat to understand • Delivery policy and earlier promises.\nWhat to do • Test earlier fee information and raise policy issues with evidence.\nA fee outside the team's control can still help explain what happens.",
 [
 exercise("Draw two boundaries", "A product team owns a booking page. Call-center staff promise appointments that the scheduling system cannot reliably confirm.",
 ["List what must be understood and what the team can act on.", 'Propose a limited next step and an issue to raise with someone who can act on it.'],
 'Understand what staff promise, how appointment availability is recorded, how confirmation works, and what happens when it fails. The team may clarify booking status or investigate whether systems stay in sync. It can raise staffing and promise policies with the people responsible. Check who can approve a change before promising work from another department.',
 ["I included relevant external influences.", 'I limited the proposed work to what the team can do.', 'I named who is responsible for work we depend on.']),
 exercise("Inspect a constraint", "A manager says that the current workflow cannot change because customers expect it.",
 ["Write questions that distinguish evidence, preference, and switching cost.", 'Name evidence that could justify keeping the workflow.'],
 'Ask which customers expect the current workflow, what evidence supports that claim, what a change would cost, and whether alternatives could preserve essential behavior. Existing integrations, training costs, or evidence that people rely on it may justify keeping parts of the workflow. Saying it has always worked this way does not explain why it should stay.',
 ["I investigated rather than dismissed the claim.", "I considered costs of changing it.", "I kept the scope of the constraint specific."])
 ],
 [
 question("A team cannot change a fee that may affect departures. Where can that fee belong?", ["Outside every investigation.", "Inside its explanation even if outside its direct control.", "Only inside the interface specification.", "Nowhere until the fee can be removed."],1,'A fee can help explain what happens even if the team cannot change it. The team may show it earlier or raise the policy with someone who can act on it.','Separate what affects the result from what you have permission to change.'),
 question('In abstraction laddering, asking "Why does this task matter?" mainly explores what?', ["Its historical root cause.", "Its technical implementation.", "The purpose behind the task.", "The popularity of the proposed solution."],2,"The question moves toward the purpose, which can support several ways forward. Causal questions investigate what produced an event.","Consider whether you are asking about goals or causes."),
 question("Which response best examines a claimed constraint?", ["Ignore it to encourage creativity.", "Accept it because a manager said it.", "Classify it as permanent without checking.", "Check its owner, evidence, scope, and cost of change."],3,'Ask why the constraint applies and where its limits are. Rejecting or accepting it without checking does not answer those questions.',"Find what makes the constraint real for this decision.")
 ])

module("Construct meaningful alternative frames",
 'Compare different accounts without forcing one cause or treating all explanations as equally strong.',
 [
 ['Change something that affects the decision', 'An alternative frame can change the group, goal, scope, or explanation. Ten possible form defects may still belong to one frame: helping people who want to buy finish payment. Helping people decide whether to buy changes what success means. A different causal explanation can also change the scope, who is responsible, and what you do. Frames and causal hypotheses are connected; they are not always separate categories.'],
 ['Allow frames to overlap', 'Working payment and clear prices may both matter to one person. Keep different processes and user groups visible when combining them would hide something that affects the decision. You do not need three mutually exclusive frames. Start with a few credible alternatives and ask how each would change your next step.'],
 ['Compare the evidence and why it matters', 'A coherent story is a possible account, not an established fact. Check whether its claims hold here, how much of the situation it explains, and whether addressing it would serve a worthwhile goal. Give stronger evidence more weight. Keep a less supported possibility visible when the cost of missing it justifies checking. Do not treat every imaginable story as equally likely.']
 ],
 'Observation • Administrators rarely use a reporting dashboard.\nPossible frames • Help administrators find the report they need. Help teams make decisions using reliable data. Find out whether the dashboard is needed at all.\nThe third frame allows for an existing report or another workflow to meet the need.',
 [
 exercise("Three accounts with consequences", "Trial users rarely return after their first session. Nothing else is known.",
 ["Write three plausible working frames.", 'For each, state the relevant outcome, a key claim it relies on, and a different next investigation.'],
 'Possible frames include helping people complete a recurring task, helping them decide whether the product fits, or separating one-time visitors from people with a reason to return. Ask about goals, task frequency, promises made before signup, or how returning users are tracked. Low return alone does not show a habit problem. The frames can overlap.',
 ["My frames change an outcome or next action.", "I did not invent findings.", "I allowed relevant overlap."]),
 exercise("Critique a forced choice", "A workshop says the problem must be either pricing, usability, or data quality.",
 ["Explain why the categories may overlap.", "Rewrite the comparison so it remains useful."],
 'Someone can find a price confusing, decide it is too high, and also be counted incorrectly. Compare the evidence, affected groups, and action each account would support. Choose a useful investigation or limited change without assuming only one account can be true.',
 ['I kept the different processes visible.', "I did not force a single winner.", 'I explained which choice the comparison helps with.'])
 ],
 [
 question("Which pair most clearly changes the intended outcome?", ["Shorten the form / improve its labels.", "Move the button / enlarge the button.", "Improve error copy / shorten error copy.", "Help buyers pay / help shoppers judge affordability."],3,'Helping buyers pay prioritizes completing a purchase. Helping shoppers judge affordability prioritizes an informed decision. The other pairs mainly offer different interface changes.',"Compare what success would mean."),
 question("Two supported frames apply to different groups. What follows?", ['Both may deserve attention, with the scope clearly stated.', "One must be eliminated.", "Their evidence cancels out.", "The groups must share one cause."],0,'Different groups can have different needs. Choose the scope using evidence, likely consequences, and available time and resources.','Different frames can apply at the same time.'),
 question('An account could explain one observation. What does that establish?', ['How common it is in the wider group.', 'A possible explanation worth checking.', 'Its proposed change will work.', "All other accounts are false."],1,'The account could fit the observation. Its cause, how widely it applies, and the effects of a change still need checking.',"Several explanations can fit the same observation.")
 ])

module("Choose research that changes a decision",
 'Choose checks that fit the decision and understand what their results can tell you.',
 [
 ['Choose an unknown that could change the decision', 'Ask which assumption could change an important choice if it were wrong. Consider how uncertain it is, what a mistake would cost, and what you can realistically learn. Explain those judgments rather than inventing numbers. If every likely finding supports the same limited next step, you may not need to investigate the difference now.'],
 ['Plan the check before looking at the results', 'Write the claim, a credible alternative, what you expect to observe, and how you will check. State what each possible result would change and what the method cannot tell you. Choose a suitable observation period. Avoid changing the definition of success after seeing the result. A fixed rule to finish within 48 to 72 hours cannot fit every decision.'],
 ["Update confidence carefully", 'Missing evidence weakens a claim when your method had a reasonable chance of detecting what the claim predicts. An unclear result leaves the question open. A well-designed experiment can show the effect of a change under the tested conditions without proving that you have found the only original cause. Keep the mechanism, how common it is, and the effect of changing it separate.']
 ],
 'Claim • Purchases through an outside payment provider are missing from the funnel.\nCheck • Match sessions to order records where the link is reliable. Choose a time window that fits actual purchasing behavior.\nIf supported • Repair tracking and examine the remaining gap.\nIf no missing purchases are found • Check whether the records cover the relevant cases before becoming less confident in the claim.\nLimit • This does not explain why people who did not buy left.',
 [
 exercise('Plan a useful check', "The team suspects failed verification causes onboarding exits.",
 ['Give another possible explanation and say what each explanation predicts.', 'Choose a check you can carry out. State what you would do for each result and one thing the check cannot tell you.'],
 'Compare failed verification with another account: some visitors never intended to finish. Check verification attempts and final outcomes, observe relevant steps, and ask people about their goals. Reliable failure records support investigating how people recover. No recorded failures tell you little if logging is incomplete. Intent needs separate evidence.',
 ["My check distinguishes accounts.", "I explained both possible results.", "I considered detection limits."]),
 exercise("Choose under a deadline", "You have one day before a launch decision. A suspected issue affects a costly integration that takes weeks to test.",
 ["Explain what can be learned now and what remains unknown.", 'Propose what to commit to now and what would make you reconsider.'],
 'Check existing records and what depends on the integration. Consider whether a limited launch, gradual rollout, or delay is justified. Name who decides and what risk remains. A quick interview cannot establish that an integration is reliable. More than one choice may be reasonable if its costs and risks are addressed.',
 ["I matched the check to the uncertainty.", "I considered delay and error costs.", 'I named an event or finding that would make me reconsider.'])
 ],
 [
 question("A log system is known to miss many failures. No failures appear in one sample. What follows?", ["Failures are impossible.", "The frame is falsified.", 'The logs miss too many failures for this check to settle the question.', "Users lack intent."],2,'Not seeing failures in unreliable logs is weak evidence that no failures happened.',"Ask whether the method could have seen the predicted event."),
 question("One observed person cannot recover from an error. What is directly supported?", ["Recovery failed in that observed situation.", "Most people encounter that error.", "The error explains the full funnel drop.", "A proposed redesign will solve it."],0,'The observation shows a failure in that case. You need more evidence to know how common it is, how much it explains the overall drop, or whether a change would help.','Separate what happened in one case from how widely it happens.'),
 question("All credible frames support the same small reversible next action. What is reasonable?", ["Investigate until only one frame remains.", "Choose the most entertaining story.", "Declare all explanations proved.", "Take the action and retain the uncertainty."],3,"You can act without resolving a distinction that does not affect the current decision, while observing consequences.","Consider the value of more information for this particular choice.")
 ])

module("Handle bias and organizational pressure",
 'Use disagreement to improve the reasoning and uncover assumptions without blaming people.',
 [
 ['Examine the reasoning before labeling a bias', "It is more useful to identify a specific weakness in reasoning than to name a bias. A team might ask why people struggle before checking that they do, recruit only people who complain, or accept a senior person's account without checking it. Ask what evidence or perspective is missing and how including it could change the choice."],
 ['Make room for different views', 'Ask people to write initial notes independently before the discussion settles on one account. Ask what each person knows that others may not. Include affected people or people who understand day-to-day operations. A vote can choose a direction, but it cannot establish a fact. Record disagreements that still matter. For conflicts about priorities, identify who is responsible for deciding.'],
 ['Explain what the next check is for', 'Someone under time pressure may reasonably want action. Explain which decision a check will help with, what it costs, and which mistake it might prevent. Propose a specific next step rather than asking vaguely for more research. Examine incentives without assuming bad intent. Ask who bears the cost when the process changes.']
 ],
 'Stakeholder • We promised a chatbot. Research will slow us down.\nResponse • Before we commit to building it, we can check the most common support categories and a few recent cases. If failed account setup explains the increase, we should compare how a chatbot and a direct repair would address it. This check helps us choose what to build this week.',
 [
 exercise("Repair a loaded interview", "The guide asks, Why was our onboarding confusing, and which steps should we remove?",
 ["Rewrite three questions around a concrete recent event.", "Identify people missing if recruitment includes only complainants."],
 'Ask what the person was trying to do, what happened at a particular step, and what they did next. Include people who completed without problems, people who left without complaining, and other relevant groups. This helps you explore different experiences. It does not guarantee that you can estimate how common each is among all users.',
 ["My questions do not assume confusion.", "I asked about actions and goals.", "I inspected recruitment gaps."]),
 exercise("Work with authority", "A VP insists that low dashboard use proves the navigation is poor.",
 ["Draft a respectful response linking one check to a decision.", "Identify what would change your mind and what might support the VP."],
 'Acknowledge the concern. Suggest checking whether intended users can find the dashboard and whether they need its information. Difficulty finding it supports examining navigation. Finding it easily but relying on another trusted report suggests different work. Connect the check to the choice about where to spend time and money.',
 ["I made the check concrete.", "I gave the original account a fair test.", "I included an alternative without treating it as fact."])
 ],
 [
 question("Which question assumes something about the person's experience before checking it?", ["What were you trying to do?", "Why was the payment step confusing?", "What happened next?", "When did you last try it?"],1,"The wording assumes confusion. First establish the person's experience through a concrete event.","Identify which question already supplies a diagnosis."),
 question("A majority votes that shipping fees cause exits. What does the vote establish?", ["A causal effect.", "A representative user sample.", "A population rate.", 'The account the team prefers. Its causal claim still needs evidence.'],3,"A vote shows or chooses the team's position. It does not provide evidence of a cause.","Distinguish agreement from evidence."),
 question("Two teams agree on the data but prefer different outcomes. What should you examine first?", ['Their trade-offs and who can decide.', "Which team has the lower IQ.", "How to collect identical data again.", "How to force a single shared preference."],0,'A conflict about priorities needs clear trade-offs and someone responsible for deciding. Collecting the same evidence again may not resolve it.',"Ask what kind of disagreement remains.")
 ])

module("Learn through prototypes and revise",
 'Explore solutions, learn from them, and keep the problem open to revision.',
 [
 ['Making something can reveal assumptions', 'A prototype can reveal a missing constraint, an unclear status, or a different user goal. Use that discovery to revise your understanding. Dorst and Cross studied how nine experienced industrial designers developed their understanding of problems and solutions together. This supports revisiting a frame while exploring solutions. It does not establish a rule for how long experts must spend framing.'],
 ['Separate what the prototype shows from wider claims', 'A working prototype shows how that prototype behaves. Someone completing a scripted task can show how usable it is in that situation. Neither result alone establishes demand, continued use, or benefits for all intended users. State what your test covers and which assumptions about real use remain untested.'],
 ['Record what changed and why', 'Keep the earlier account, the new evidence, what changed in your understanding, and the decision that followed. State any change in scope or goal. If an experiment improves a target metric, check for costs and other explanations before treating it as proof that your original explanation was complete. Results depend on how a change is built and used, as well as on the frame.']
 ],
 'Prototype discovery • Showing a shipping estimate requires an address. Shoppers hesitate to share one before seeing any estimate.\nRevision • Find out how much location detail is needed to give an honest price range, and how people understand the uncertainty in that range.\nThe original frame concerned showing prices earlier. The prototype reveals that this also depends on what information people will share.',
 [
 exercise("Learn from a prototype", "A mock report works with clean sample data. In actual workflows, different teams use conflicting definitions for the same measure.",
 ["Explain the change in problem understanding.", "Propose a revised scope and a next investigation."],
 'The problem may involve shared definitions and trust in data, as well as how the report is displayed. Check which decisions it supports, where definitions differ, and who can approve a shared definition or clearly labeled differences. A polished interface does not resolve conflicting measures.',
 ["I named the new evidence.", 'I stated which scope or assumption changed.', 'I did not assume that success with sample data proves it will work with real data.']),
 exercise("Interpret a positive result", "A shorter form increases completion in a randomized test. You have no follow-up data on account quality.",
 ["State what the result supports under valid test assumptions.", "Name two claims it cannot yet establish and an outcome to watch."],
 'Assuming the test was valid, the result supports an effect on measured completion in the tested conditions. It does not prove that confusion was the only reason for earlier exits or show long-term account quality. Watch whether completions were intended, whether information is missing or inaccurate, and how much effort later problems take to resolve.',
 ["I kept the conclusion tied to the measured outcome.", 'I did not claim that the test proved there was only one cause.', 'I considered what could happen later.'])
 ],
 [
 question("A prototype reveals a previously unknown dependency. What should happen?", ["Ignore it to protect the brief.", "Declare the prototype invalid.", "Revisit the affected assumptions and scope.", "Restart all research automatically."],2,"New evidence should update the relevant account. The amount of additional work depends on what decision changes.","A revision can be targeted."),
 question('Someone successfully completes a scripted usability task. Which claim does that result alone fail to support?', ["The tested participant completed the scripted task.", "The product has broad market demand.", "The interface supported that observed completion.", "The test produced an observation."],1,"Task completion in a test does not establish demand across a market.","Compare the test context with the broader claim."),
 question("Which revision record is most useful?", ["We aligned and moved forward.", "The new version looks better.", "Leadership preferred the new frame.", 'Earlier account, new evidence, revised assumption, and the decision that changed.'],3,"Those details preserve why the understanding changed and how the change affected action.","Make the reasoning traceable to evidence.")
 ])

module("Commit, communicate, and know when to stop",
 'Explain your decision, who acts next, and when to reconsider.',
 [
 ['Decide when to stop investigating', 'More framing is worthwhile when what you could learn might improve the choice enough to justify the cost and delay. A defect you can reliably reproduce may need little investigation. Expensive changes and decisions that are hard to reverse deserve more care. Take steps to contain an urgent incident while investigating it. Aim for an action you can justify, with its limits clearly stated.'],
 ['Write a decision record', 'State who is affected, what is happening, the evidence for the concern, the desired improvement, the scope, key assumptions, alternatives, and why you chose the next action. Name who makes the decision and who carries out the next step. Include what remains unknown and a specific event or finding that would make you reconsider. A problem statement can summarize this reasoning, but it cannot explain all of it.'],
 ['Choose a few methods that help you think', 'TOSCA asks about trouble, owner, success, constraints, and actors: what is wrong, who owns the decision, what improvement means, what limits apply, and who is involved. Abstraction laddering moves between a task, its purpose, and ways to achieve that purpose. Frame Creation examines a persistent situation through its history, people, recurring themes, alternatives, and possible futures. A How Might We question can express a challenge, but it can still hide a chosen solution. Methods help you reason; none guarantees a good decision.']
 ],
 'Decision record • We will investigate failures among people attempting to pay with method X. Existing records show repeated errors in this group. We will check whether people can recover before proposing a broad redesign. The person responsible for reliability will report findings on Friday. We will reconsider the scope if records reveal purchases missing from the funnel or show that the problem affects other payment methods.\nThis example is fictional.',
 [
 exercise("A five-sentence handoff", "Return to one earlier exercise.",
 ["Write a five-sentence decision record.", 'Include a priority, evidence-backed claim, unchecked assumption, responsible person, and reason to review the decision.'],
 'A good record lets a colleague understand the choice without attending the meeting. It connects the next action to evidence and priorities, names what remains unknown, and says when to reconsider. Different choices about scope can be well supported if their reasons are clear and fit the decision.',
 ["I identified who acts next.", "I connected the action to evidence.", "My trigger can be observed."]),
 exercise("Stop or investigate", "A form button is reproducibly broken in one supported browser. The expected behavior is agreed and a small repair can be verified.",
 ["Choose a next step and explain the appropriate amount of framing.", "Name a discovery that would justify widening the scope."],
 'Repair the specific defect and check that the button works through the supported route. A broad investigation may add little to this choice. Widen the work if you discover that the defect depends on a larger system issue, affects other flows, or involves disagreement about the expected behavior.',
 ["I matched effort to the decision.", 'I included a check that the repair works.', "I named a specific reason to expand."])
 ],
 [
 question('A small reproducible defect has an agreed expected behavior. What is a next step that fits the decision?', ['Repair and verify the specific defect.', "Run a mandatory two-week framing workshop.", "Invent three mutually exclusive user needs.", "Wait until every system dependency is mapped."],0,'The known defect and agreed behavior support a repair with a clear, limited scope. Investigate more widely when new evidence gives you a reason.',"Consider the uncertainty relevant to this commitment."),
 question('Which reason to review the decision is most actionable?', ["When we feel ready.", "If repeated payment errors persist after the release.", "Whenever the frame seems imperfect.", "When everyone agrees."],1,'Repeated payment errors give you something specific to check. Feelings and agreement do not define what result should prompt a review.',"Choose something a colleague could observe."),
 question('When is more framing worth doing?', ["Another workshop is already booked.", "The brief lacks elegant wording.", "The team has not used every framework.", 'An unchecked assumption could change an expensive decision.'],3,'More investigation is worth considering when it could improve an important choice. Weigh that benefit against the cost and delay.',"Ask what another round of learning could change.")
 ])

module("Use AI and build your own judgment",
 'Check AI-generated reasoning and use what you learn in unfamiliar situations.',
 [
 ['Use AI to suggest possibilities', 'AI can suggest alternative frames, point out hidden assumptions, or criticize a draft. Its answers do not show what people using your product actually do. Check factual claims against suitable evidence and follow references back to their sources. Several models repeating an idea do not necessarily provide independent confirmation.'],
 ['Ask what is known and what could challenge the account', 'Give the model the known evidence and ask it to label invented examples. Request alternatives that could change the goal or next action, the assumptions behind each, and practical ways to check them. See whether it keeps the original frame while listing many possible causes within it. Write down your own working account first, so you can notice when fluent AI writing starts to steer the discussion.'],
 ['Keep a decision journal', 'Before a project, record your starting account and the unknown that matters to your next step. Afterward, note what changed your understanding and which decisions changed. Review methods that took time without affecting a choice. Judge the decision using what you could reasonably have known then, as well as what happened later. Weak reasoning can lead to a good result, and a well-supported decision can be disrupted by an unexpected event.']
 ],
 'Useful AI request • Use only the supplied evidence. Label observations, interpretations, priorities, and missing information. Suggest two credible frames that could change a decision. For each, name a key assumption, evidence that could challenge it, and a next step we can carry out. Label every invented example.\nReview • Check the claims and whether the proposed checks would help with the decision.',
 [
 exercise("Audit generated certainty", "AI says that low retention proves users lack motivation, that gamification will solve it, and that three generated personas validate the need.",
 ['Identify three claims or steps in the reasoning that lack support.', 'Rewrite the advice as an investigation brief and a possible change to test.'],
 'Low return does not prove low motivation caused it. Gamification is an idea that has not been tested. Generated personas are not evidence from participants. Investigate task frequency, product fit, and actual return behavior before choosing what to build. You can still consider gamification if you examine why it might help and what its consequences could be.',
 ["I separated cause, solution, and evidence.", "I kept plausible alternatives visible.", "I did not treat generated people as a user study."]),
 exercise("Transfer to your own work", "Choose a real brief you can discuss without including confidential or personal information.",
 ["Complete the course's decision record.", "List what changed since your first interpretation and the next evidence to seek."],
 'Review the record using the final project rubric. Show the evidence, label unknowns, describe affected people fairly, limit the work to a practical scope, and explain why the next step is worth its cost. If you use a real case, remove sensitive details from any export you share.',
 ['I showed the evidence for claims that could change the decision.', 'I chose work whose effort and risk fit the decision.', "I explained what would change my mind."])
 ],
 [
 question("Three AI personas describe the same difficulty. What do they provide?", ["Three independent participant observations.", "A measured population rate.", "Generated possibilities requiring real-world verification.", "A validated problem frame."],2,"Generated personas can suggest hypotheses but do not supply observations from your product's users.","Ask where the behavioral evidence came from."),
 question('Which AI request best separates evidence from assumptions and inventions?', ["Explain why users are lazy.", "Mark what is observed, assumed, and invented, then propose checks.", "Prove the executive's idea is right.", "Write ten confident causes without caveats."],1,'Labeling evidence, assumptions, and inventions makes the answer easier to inspect. You still need to check its claims.',"Look for a request that exposes the status of claims."),
 question("A well-supported decision has a poor outcome after an unforeseen external change. How should it be reviewed?", ["The frame was necessarily wrong.", "The outcome proves the research was useless.", "The decision must never be revisited.", "Assess the evidence available then and update for the new context."],3,"Decision quality and outcomes are related without being identical. Review what was knowable and what needs to change now.","Separate hindsight from what informed the original commitment.")
 ])

capstone = dict(id=11,title='Final project · The reporting dashboard',objective='Make a decision you can justify, then revise it as new evidence arrives.',minutes="90–120",
sections=[
["Your assignment",'All organizations, people, numbers, and findings in this case are fictional. A director requests an AI assistant for a reporting dashboard because only 18% of eligible accounts opened it last month. You have one week to recommend what the team should work on for the next six weeks. The team can change the interface and work with data operations. It cannot promise that another team will change its policies.'],
["Evidence round one",'The 18% counts accounts. An account is called eligible when a feature flag is enabled; this does not mean someone on the account is responsible for reporting. Three current users report difficulty finding a particular breakdown. Five account managers say some customers use scheduled spreadsheet exports. There has been no study designed to represent nonusers. The director wants visible AI progress for an upcoming demonstration.'],
["Evidence round two",'A fictional audit examines 30 deliberately selected accounts. Twelve have no one currently responsible for reporting, 10 use scheduled exports, and 8 rely on the dashboard. Six of those 8 report delaying decisions when metric definitions conflict. This is a purposive sample: accounts were chosen for a reason, rather than to represent all accounts. Do not treat these counts as estimates for all users. The exports and dashboard share the definitions problem. Data operations can investigate definitions in two weeks. Changing a core definition requires agreement across departments.'],
["What you must decide",'Recommend what the team should work on. Explain which outcome takes priority, what you will check next, and what would make you reconsider. Several paths could be reasonable: a small navigation change, an investigation into definitions, a focused AI experiment, or another option supported by the evidence. Explain the cost and limits of your choice.']
],
worked='Work in order • Save your starting account before reading round one. Revise after round one, then again after round two. All evidence is available, but keeping your earlier reasoning lets you examine what changed and why.',
exercises=[
exercise("Before opening the evidence", "Use only the assignment paragraph.",
['State what needs to be decided and your starting frame.', "Identify assumptions behind both the 18% measure and the AI request.", "State two plausible alternative frames."],
'A useful starting question is whether low dashboard use reflects unmet reporting needs and what deserves six weeks of work. We do not yet know whether eligible accounts need reports, what decisions they face, or how AI would help. The rate alone does not show low motivation.',
["I preserved the unknowns.", "I separated the AI request from the concern.", "My alternatives change the next investigation."]),
exercise("Revise after round one", "Use the assignment and evidence round one.",
["Update the affected groups and boundaries.", 'Propose a check that could change where the team spends its time.', "Explain how the demonstration incentive affects the decision without assuming bad intent."],
'Separate people who need to report from accounts that merely have the feature enabled. Examine exports, navigation difficulties, and the task the dashboard serves. Check responsibilities and workflows before treating all nonuse as failed adoption. Include the demonstration as a stated priority when weighing the options.',
['I revised an assumption that matters to the decision.', "I represented user and director priorities.", 'I explained a check the team can carry out.']),
exercise("Final decision after round two", "Use all evidence and the scoring rubric below.",
['Write a 400–600 word decision memo that explains source limits, alternatives, chosen work, who is responsible, the next action, and when to reconsider.', "Include user and business outcomes and a cost to monitor.", 'Explain what the purposive sample cannot tell you about all accounts.'],
'One reasonable choice is a limited investigation with data operations into definitions that delay decisions. Keep a small navigation repair if it helps. A focused AI experiment could test help explaining metrics once their sources and meanings are clear. The sample reveals problems in particular workflows; it does not show how common they are across all eligible accounts. Another recommendation can score well if it addresses the evidence, trade-offs, dependencies, and unknowns.',
['I did not assume the sample percentages describe all accounts.', "My scope connects to a supported need.", 'My action has an owner and reason to review the decision.'])
],quiz=[])
for idx in [1,2,3,4,5,6,7,8,9,10]:
    capstone["quiz"].append(dict(modules[idx-1]["quiz"][(idx-1)%3]))
modules.append(capstone)

sources=[
["Kelly and Gero · 2022","Review of design frames and differences in how researchers define them.","https://doi.org/10.1017/dsj.2022.25"],
["Ananth, Baer, and Deichmann · 2025",'Review of research in seven fields on how people develop problem representations. Published online in 2024.',"https://doi.org/10.1177/01492063241291532"],
["Dorst and Cross · 2001",'Study of nine experienced designers that examined their recorded design process as they developed problems and solutions.',"https://doi.org/10.1016/S0142-694X(01)00009-6"],
["van der Bijl-Brouwer · 2019",'Five case studies of agencies showing how frames change in public and social innovation work.',"https://www.sciencedirect.com/science/article/pii/S2405872618301114"],
["Baer, Dirks, and Nickerson · 2013",'Theory about organizational obstacles to defining problems, with an example of a structured investigation.',"https://doi.org/10.1002/smj.2004"],
["Garrette, Phelps, and Sibony · 2018","Practitioner method summary including TOSCA.","https://cracked-it-book.com/wp-content/uploads/CRACKED-IT-4S-method-in-one-page-v2.pdf"],
["LUMA Institute","Practitioner guidance for abstraction laddering.","https://www.luma-institute.com/abstraction-laddering/"],
["Dorst · Frame Innovation","Book developing the Frame Creation method.","https://mitpress.mit.edu/9780262550963/frame-innovation/"],
["Jansson and Smith · 1991",'Experiments on design fixation: becoming stuck on an existing idea while developing a design.',"https://doi.org/10.1016/0142-694X(91)90003-F"],
["Nickerson · 1998",'Review of confirmation bias: favoring evidence or interpretations that support an existing belief.',"https://doi.org/10.1037/1089-2680.2.2.175"]
]
rubric=[
["Evidence",'You show which evidence supports your claims, explain the limits of the measurements, and label invented details.'],
["People and outcomes",'You describe affected people and their goals fairly, state which outcome takes priority, and explain the trade-offs.'],
["Boundaries",'Your explanation includes relevant influences. Your plan accounts for who can approve changes and what depends on others.'],
["Alternatives",'You compare credible alternatives that could change the goal or next step, allowing overlap when the evidence supports it.'],
["Inquiry",'The next check addresses an unknown that could change the decision. You explain what the result could and could not tell you.'],
["Commitment and revision",'The planned work fits the decision, someone is responsible, and a specific event or finding would prompt a review.']
]
for m in modules:
    for i,q in enumerate(m["quiz"]):
        # Rotate options deterministically so answer positions vary.
        shift=(m["id"]+i)%4
        q["options"]=q["options"][shift:]+q["options"][:shift]
        q["correct"]=(q["correct"]-shift)%4
from foundations import foundation, extra_sources, videos
modules.insert(0, foundation)
sources.extend(extra_sources)
for m in modules:
    m["videos"] = videos.get(m["id"], [])
Path(__file__).with_name("course-data.js").write_text("window.COURSE = "+json.dumps(dict(modules=modules,sources=sources,rubric=rubric),ensure_ascii=False,indent=2)+";\n")
print(f"{len(modules)} modules, {sum(len(m['quiz']) for m in modules)} quiz items, {sum(len(m['exercises']) for m in modules)} exercises")
