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
 ["A brief contains several kinds of claim", "Imagine receiving this fictional request. Redesign checkout because 62% of sessions drop off at payment. The dashboard reading is a reported observation. The claim that the interface causes lost orders is an interpretation. The instruction to redesign is a proposed intervention. Each may deserve attention, but the report alone cannot establish the interpretation. Keep the original wording so you can inspect the reasoning it contains."],
 ["Find what must be decided", "Ask what prompted concern, what changed, why this matters now, who can authorize action, and what delay would cost. The pending decision might be whether to spend a quarter rebuilding checkout or whether to investigate an incident today. Those decisions require different levels of confidence. A useful first frame can be an investigation question. You do not need to pretend you already know the user problem."],
 ["Write a provisional brief", "Name the people and situation, the condition of concern, the intended improvement, and the relevant scope. Keep evidence and unknowns alongside that account. A short paragraph is often more useful than a polished sentence. Record what the frame excludes. Revisit the account when inquiry, prototypes, or a change in priorities makes its assumptions less credible."]
 ],
 "Inherited request • Add a chatbot because support tickets increased.\nWorking question • Establish which support needs increased and whether customers can resolve them, so we can choose an appropriate response.\nWhy this helps • It leaves automation, product repair, clearer information, and staffing available until the evidence supports a choice.",
 [
 exercise("Unpack the checkout brief", "The only supplied information is the reported 62% checkout drop and the redesign request.",
 ["Separate the observation, interpretation, assumption, priority, and proposal.", "Write the pending decision and three questions that would materially change it."],
 "Observation • a dashboard reports a rate. Assumptions might include that the events are reliable, missing completion means no order, and the people intended to buy. The proposed intervention is redesign. A reasonable pending decision is whether to invest in redesign or investigate another explanation. The business priority has not yet been specified precisely.",
 ["I did not treat the cause as known.", "I stated a decision that a person can make.", "My questions could alter the next action."]),
 exercise("Remove the feature from the need", "A director says that customers need an AI onboarding assistant.",
 ["Write two possible needs that could motivate the request.", "For each, explain what would make a non-assistant intervention plausible."],
 "One possibility is that new administrators cannot configure permissions correctly. Another is that buyers cannot judge whether the product fits their workflow. Configuration defaults, clearer documentation, or better product information might help. These are candidate needs, not findings. Ask what specific events motivated the request.",
 ["I kept candidate needs provisional.", "I allowed more than one intervention.", "I identified missing evidence."])
 ],
 [
 question("Only a dashboard reports a 62% drop. Which claim is directly supported?", ["62% of people tried and failed to pay.", "The report shows a 62% drop between recorded steps.", "The payment form causes most lost orders.", "Shortening checkout will increase purchases."],1,"A report is evidence of what the system records. Intent, causality, and intervention effects need additional support.","Distinguish the reporting system from the behavior it is meant to represent."),
 question("Which statement specifies a decision?", ["Users are confused.", "The screen has ten fields.", "Should we fund a checkout rebuild this quarter?", "We should understand our users better."],2,"Funding a rebuild is a choice with an owner and consequences. The other statements are an interpretation, a count, and a broad aspiration.","Look for a choice that could lead to different actions."),
 question("No causal evidence is available yet. What can a defensible brief do?", ["State an investigation question and its decision purpose.", "Choose the most plausible cause as a fact.", "Delay all action until every cause is known.", "Require a redesign to preserve momentum."],0,"An investigation brief can name the uncertainty and the choice it informs without inventing a diagnosis.","A useful brief can acknowledge what remains unknown.")
 ])

module("Check evidence and measurement",
 "Determine what a signal establishes and what remains uncertain.",
 [
 ["Measurements have definitions", "A rate requires a denominator, event definitions, a unit, and a time window. A session, person, attempt, and order are different units. Someone can fail twice, succeed once, and appear in several sessions. Ask whether external payment providers, delayed events, consent settings, or returns on another device affect the data. These are checks to consider, not explanations to assume."],
 ["Use comparison carefully", "An alarming number needs context. Compare relevant periods and populations, taking account of changes in traffic or instrumentation. An overall rate can change when the mix of visitors changes even if behavior inside each group stays stable. Split data when a distinction could change an action. Avoid searching endless segments for an exciting story."],
 ["Keep coverage visible", "Record where evidence came from, when it was collected, who it covers, and its known limits. A convenience sample can expose a tracking error without estimating its frequency across all users. Several reports quoting the same interview remain one underlying source. Missing evidence is informative only if your method could reasonably have detected the expected signal."]
 ],
 "Fictional check • Of 20 conveniently selected sessions marked as abandoned, 6 link to completed orders.\nSupported • At least some apparent exits in this sample are recorded purchases.\nStill open • The population tracking-error rate, the true purchase rate, and the reasons for genuine exits.",
 [
 exercise("Audit a funnel", "An analyst says that 600 of 1,000 sessions did not emit the completion event within 10 minutes.",
 ["Write five checks before calling these 600 failed purchases.", "Name two claims the data cannot support on its own."],
 "Check event behavior, time to completion, session-to-order linkage, retries or multiple sessions, and comparability of traffic. The statement describes missing recorded events in a window. It does not by itself establish purchase intent or interface difficulty. Longer windows should be justified by actual purchasing behavior.",
 ["I checked the denominator and window.", "I separated attempt status from final outcome.", "I avoided inferring intent from an event."]),
 exercise("Explain a changing aggregate", "Period A has 100 returning visitors at 80% completion and 100 new visitors at 20%. Period B has 50 returning visitors at 80% and 150 new visitors at 20%.",
 ["Calculate each period's overall completion rate.", "Explain what changed and which causal claim would be premature."],
 "A has 80 + 20 = 100 completions from 200 visitors, or 50%. B has 40 + 30 = 70 from 200, or 35%. Within-group rates stayed constant while the visitor mix changed. These counts do not show that an interface change caused the overall decline.",
 ["My calculations use the correct denominator.", "I noticed the change in traffic mix.", "I did not claim the data rule out every interface issue."])
 ],
 [
 question("Six of 20 convenience-sampled exits link to orders. What follows?", ["Exactly 30% of all exits are tracking errors.", "Most shoppers cannot pay.", "The remaining 14 were caused by the form.", "Some sampled exits were completed purchases."],3,"The sample reveals a mismatch, but its selection does not establish a population rate or explain the other sessions.","Separate detecting an issue from estimating its prevalence."),
 question("Two reports and a slide deck all cite one interview. How many independent participant accounts are present?", ["Three", "One", "Two", "None"],1,"Repackaging a source does not create independent evidence. There is one underlying participant account.","Trace each claim to its original evidence."),
 question("Which record best supports interpreting a funnel?", ["A screenshot of its headline rate.", "A list of proposed interface changes.", "Event definitions, unit, denominator, period, and known gaps.", "The most senior person's estimate."],2,"Those details let someone inspect what the rate measures. A screenshot, proposal, or estimate cannot replace the definitions.","Ask what another analyst needs to reproduce the interpretation.")
 ])

module("Choose whose outcome matters",
 "Distinguish empirical claims from priorities and make trade-offs explicit.",
 [
 ["A business concern can point to several needs", "Lost conversion matters to a merchant. A shopper might want reliable payment, an affordable total, or enough information to decide. A real exit does not establish that the shopper experienced a failure. Ask about a recent concrete event and what the person was trying to achieve. Leave room for people to have different goals in the same interface."],
 ["Define improvement before selecting a metric", "A measure should represent an intended outcome. Earlier price visibility may reduce wasted effort while purchases remain constant. A conversion increase accompanied by more accidental orders or refunds may involve an unwanted cost. State which outcomes are primary, which costs must be watched, and whose interests the choice prioritizes."],
 ["Evidence informs a value choice", "You can investigate when people discover shipping fees and what follows. Choosing whether to prioritize informed choice, revenue, or operational effort also involves values and authority. Ask who decides and who bears the consequences. More interviews can clarify experience while leaving a legitimate disagreement about priorities unresolved."]
 ],
 "Fictional alternatives • Help intending buyers complete payment. Help shoppers evaluate total cost. Help support staff resolve payment incidents.\nDifferent success criteria • Successful intended purchases, earlier informed decisions, and lower recovery effort.\nThese frames can coexist, and the team must choose a justified scope.",
 [
 exercise("Compare outcomes", "A shipping estimator makes people leave earlier. Total purchases stay constant and observed price-checking takes less time.",
 ["Explain a possible user improvement and a business interpretation.", "Name evidence you still need before claiming the change helped all shoppers."],
 "The estimator may help people judge affordability with less effort. Stable purchases do not establish a revenue benefit or harm. Check coverage, other groups, errors in estimates, and whether the observed time reduction generalizes. An earlier exit alone is ambiguous.",
 ["I distinguished the goals.", "I did not assume every exit is bad.", "I identified possible costs or excluded groups."]),
 exercise("Handle conflicting goals", "Sales wants fewer onboarding questions. Risk operations wants more reliable account information. Applicants want a quick, understandable process.",
 ["Write each perspective fairly.", "Propose one investigation and one decision that evidence alone cannot settle."],
 "Investigate which information affects account quality and where applicants incur effort or make errors. The acceptable trade-off between speed, reliability, and operating costs requires accountable judgment. Do not label the disagreement a bias before understanding its basis.",
 ["I represented each interest without stereotyping.", "I separated an empirical question from a priority.", "I named who needs to decide."])
 ],
 [
 question("Purchases stay flat while shoppers discover total cost earlier and spend less time finding it. Which statement is defensible?", ["A user outcome may improve while conversion stays flat.", "The redesign must have failed.", "The business is guaranteed to gain revenue.", "Every shopper now understands all costs."],0,"A shorter, better-informed decision can be valuable without more purchases. The evidence does not guarantee broader comprehension or revenue.","Consider the shopper's goal as well as the merchant's."),
 question("Which question mainly concerns a priority?", ["When does shipping cost appear?", "How many attempts failed?", "Which provider emitted the error?", "Whose outcome should this project prioritize?"],3,"Choosing whose outcome receives priority involves values and decision authority, although evidence can inform the consequences.","Distinguish a measurable event from a choice about what matters."),
 question("Conversion rises, but accidental orders and refunds also rise. What is missing from conversion alone?", ["A larger font.", "The costs and quality of the resulting purchases.", "Proof that the team worked hard.", "A more confident problem statement."],1,"Conversion alone omits whether the purchases were intended and what recovery costs they created.","Ask what undesirable outcomes can accompany the target metric.")
 ])

module("Set boundaries and verify constraints",
 "Understand enough of the system while keeping commitments feasible.",
 [
 ["Understanding and authority have different limits", "The explanation boundary includes relationships you need to understand. The intervention boundary covers what you can change, influence, or escalate. A team may need to understand acquisition promises and shipping policy even when it owns only checkout. Excluding an influence because you cannot control it can distort the account."],
 ["Check consequential constraints", "For a constraint that changes the available options, ask who established it, its scope, its evidence, and what changing it costs. Some requirements are binding for the present decision. Some historical choices can be revisited. Avoid assuming either that every obstacle is fixed or that every rule is negotiable. Record relevant dependencies and their owners."],
 ["Adjust the level of the question", "Abstraction laddering moves between a proposed task and its purpose. Ask why a shorter form matters, then consider other ways to serve that purpose. This differs from asking why a person left, which concerns causes. Widen the inquiry when it could change a decision. Return to feasible action when further expansion adds no useful distinction."]
 ],
 "Checkout team • Cannot change delivery fees, but can change when estimates appear.\nExplanation scope • Include delivery policy and earlier promises.\nAction scope • Evaluate earlier disclosure, and escalate policy issues with evidence.\nA fee outside the team's control can remain relevant to its explanation.",
 [
 exercise("Draw two boundaries", "A product team owns a booking page. Call-center staff promise appointments that the scheduling system cannot reliably confirm.",
 ["List what must be understood and what the team can act on.", "Propose a bounded next step and an escalation."],
 "Understand the promises, capacity data, confirmation process, and failure consequences. The team may improve status clarity or investigate synchronization while escalating staffing and promise policies. Confirm authority before committing another department to changes.",
 ["I included relevant external influences.", "I bounded the action.", "I identified an owner for dependencies."]),
 exercise("Inspect a constraint", "A manager says that the current workflow cannot change because customers expect it.",
 ["Write questions that distinguish evidence, preference, and switching cost.", "Name evidence that could justify retaining the workflow."],
 "Ask which customers, what they expect, the supporting observations, the consequences of change, and whether alternatives preserve essential behavior. Existing integrations, training costs, or demonstrated reliance may justify keeping parts of it. Tradition alone leaves the rationale unresolved.",
 ["I investigated rather than dismissed the claim.", "I considered costs of changing it.", "I kept the scope of the constraint specific."])
 ],
 [
 question("A team cannot change a fee that may affect departures. Where can that fee belong?", ["Outside every investigation.", "Inside its explanation even if outside its direct control.", "Only inside the interface specification.", "Nowhere until the fee can be removed."],1,"Relevance to an explanation does not depend on direct control. The team may alter disclosure or escalate the policy.","Separate causal relevance from authority."),
 question("In abstraction laddering, why does this task matter mainly explores what?", ["Its historical root cause.", "Its technical implementation.", "The purpose behind the task.", "The popularity of the proposed solution."],2,"The question moves toward the purpose, which can support several ways forward. Causal questions investigate what produced an event.","Consider whether you are asking about goals or causes."),
 question("Which response best examines a claimed constraint?", ["Ignore it to encourage creativity.", "Accept it because a manager said it.", "Classify it as permanent without checking.", "Check its owner, evidence, scope, and cost of change."],3,"A constraint needs a specific rationale. Neither immediate dismissal nor automatic acceptance establishes its scope.","Find what makes the constraint real for this decision.")
 ])

module("Construct meaningful alternative frames",
 "Compare different accounts without forcing a single cause or inventing equivalence.",
 [
 ["Change something that matters", "An alternative can change the group, goal, scope, or explanatory account. Ten possible form defects can still sit inside one frame about helping intending buyers finish payment. Helping people judge whether to buy changes what success means. A new causal account can also change scope, ownership, and intervention. Frames and causal hypotheses are related rather than cleanly separable boxes."],
 ["Use overlap intelligently", "Reliable payment and price clarity may both matter to one person. Preserve simultaneous mechanisms and different populations when merging them would hide a consequential distinction. Do not require three mutually exclusive frames. Start with a small number of credible alternatives and ask what each would change in the next action."],
 ["Compare support and relevance", "A coherent story is a candidate account. Check whether its premises hold here, how much of the situation it covers, and whether addressing it serves a worthwhile outcome. Give stronger evidence more weight. Keep weak but consequential possibilities visible when investigating them is justified. Avoid pretending every imaginable story is equally plausible."]
 ],
 "Symptom • Administrators rarely use a reporting dashboard.\nPossible frames • Help administrators find the report they need. Help teams get decisions supported by reliable data. Help managers understand whether the dashboard is needed at all.\nThe third frame allows an existing report or another workflow to meet the need.",
 [
 exercise("Three accounts with consequences", "Trial users rarely return after their first session. Nothing else is known.",
 ["Write three plausible working frames.", "For each, state the relevant outcome, a critical premise, and a different next investigation."],
 "Candidates might concern completing a recurring task, evaluating product fit, or distinguishing one-time visitors from recurring users. Ask about goals, task frequency, acquisition promises, or identity tracking as appropriate. Low return alone does not establish a habit problem. Alternatives can overlap.",
 ["My frames change an outcome or next action.", "I did not invent findings.", "I allowed relevant overlap."]),
 exercise("Critique a forced choice", "A workshop says the problem must be either pricing, usability, or data quality.",
 ["Explain why the categories may overlap.", "Rewrite the comparison so it remains useful."],
 "A person can face a confusing price presentation, reject the price, and be miscounted. Compare evidence for each account, affected groups, and the action each would justify. Select an investigation or bounded intervention without asserting exclusivity.",
 ["I kept mechanisms distinguishable.", "I did not force a single winner.", "I explained what choice the comparison informs."])
 ],
 [
 question("Which pair most clearly changes the intended outcome?", ["Shorten the form / improve its labels.", "Move the button / enlarge the button.", "Improve error copy / shorten error copy.", "Help buyers pay / help shoppers judge affordability."],3,"The final pair prioritizes completing a purchase versus making an informed purchase decision. The other pairs mainly vary interface interventions.","Compare what success would mean."),
 question("Two supported frames apply to different groups. What follows?", ["Both may deserve attention with an explicit scope.", "One must be eliminated.", "Their evidence cancels out.", "The groups must share one cause."],0,"Different groups can have distinct needs. Decide scope using support, consequences, and resources.","Frames need not compete for logical truth."),
 question("A plausible account fits one observation. What has been established?", ["Its population prevalence.", "A candidate explanation worth evaluating.", "Its intervention will work.", "All other accounts are false."],1,"Fitting an observation establishes plausibility, with cause, coverage, and intervention effects still open.","Several explanations can fit the same observation.")
 ])

module("Choose research that changes a decision",
 "Design proportionate probes and interpret their limits.",
 [
 ["Prioritize a consequential uncertainty", "Ask which premise could change a costly or important choice if wrong. Consider how uncertain it is, how damaging a mistake would be, and how feasible learning is. These are judgments to explain, not numbers to fabricate. If every likely finding supports the same bounded next action, further distinction may be unnecessary now."],
 ["Specify the probe", "Write the claim, a credible alternative, expected observations, method, and interpretation before looking. Explain what each possible result would change and what the method cannot reveal. Choose a reasonable observation window and avoid redefining success after seeing the result. A fixed 48 to 72 hour rule cannot fit all decisions."],
 ["Update confidence carefully", "Missing evidence weakens a claim when the method had a reasonable chance to detect the expected event. An inconclusive check leaves uncertainty. A well-designed experiment can support an intervention's effect in its conditions without uniquely establishing the original cause. Keep mechanism, prevalence, and effect separate."]
 ],
 "Claim • External-provider purchases are missing from the funnel.\nProbe • Reconcile reliably linkable sessions with order records over a justified window.\nIf supported • Repair measurement and assess the remaining gap.\nIf not observed • Assess coverage before lowering confidence.\nLimit • This does not explain why genuine nonbuyers left.",
 [
 exercise("Write a probe card", "The team suspects failed verification causes onboarding exits.",
 ["State a rival account and predictions.", "Choose a feasible check, a decision for each result, and one limitation."],
 "Compare people unable to verify with visitors who did not intend to finish. Inspect verification attempts and final outcomes, then observe relevant flows and ask about goals. Reliable failure records support investigating recovery. No failures in an incomplete logging system are inconclusive. Intent needs additional evidence.",
 ["My check distinguishes accounts.", "I explained both possible results.", "I considered detection limits."]),
 exercise("Choose under a deadline", "You have one day before a launch decision. A suspected issue affects a costly integration that takes weeks to test.",
 ["Explain what can be learned now and what remains unknown.", "Propose a bounded commitment and revision trigger."],
 "Inspect existing records and dependencies, assess consequences, and choose whether a limited launch, staged exposure, or delay is justified. Name the owner and unresolved risk. A quick interview cannot verify an integration's reliability. More than one action can be defensible if the reasoning addresses the consequences.",
 ["I matched the check to the uncertainty.", "I considered delay and error costs.", "I defined an observable trigger."])
 ],
 [
 question("A log system is known to miss many failures. No failures appear in one sample. What follows?", ["Failures are impossible.", "The frame is falsified.", "Detection limits make this check inconclusive.", "Users lack intent."],2,"Absence from an unreliable detector does not strongly support absence in reality.","Ask whether the method could have seen the predicted event."),
 question("One observed person cannot recover from an error. What is directly supported?", ["Recovery failed in that observed situation.", "Most people encounter that error.", "The error explains the full funnel drop.", "A proposed redesign will solve it."],0,"The observation reveals a concrete failure. Frequency, contribution, and intervention effects need further evidence.","Separate mechanism from coverage."),
 question("All credible frames support the same small reversible next action. What is reasonable?", ["Investigate until only one frame remains.", "Choose the most entertaining story.", "Declare all explanations proved.", "Take the action and retain the uncertainty."],3,"You can act without resolving a distinction that does not affect the current decision, while observing consequences.","Consider the value of more information for this particular choice.")
 ])

module("Handle bias and organizational pressure",
 "Make disagreement productive and expose hidden premises without blaming people.",
 [
 ["Look at behavior before labels", "A bias label is less useful than an observable weakness in reasoning. A team might ask why people struggle before establishing that they do, recruit only vocal complainants, or treat a senior person's account as a premise. Ask which evidence or perspective is missing and how its inclusion could change the choice."],
 ["Design the conversation", "Independent initial notes can preserve alternatives before discussion anchors on one account. Ask each participant to identify information others may lack. Include affected people or relevant operational knowledge. Agreement can authorize a direction, but a vote does not establish an empirical claim. Record legitimate dissent and let the accountable owner decide priority conflicts."],
 ["Respond to pressure concretely", "A stakeholder under time pressure may reasonably want action. Explain which pending decision a check informs, its cost, and what error it could prevent. Present a bounded next step rather than an abstract request for more discovery. Examine incentives without assuming malicious intent. Ask who bears the cost when the process changes."]
 ],
 "Stakeholder • We promised a chatbot. Research will slow us down.\nResponse • Before committing the build, we can inspect the top support categories and a small set of recent cases. If the increase comes from failed account setup, the chatbot needs to address that mechanism or we should compare a direct repair. The check informs this week's scope decision.",
 [
 exercise("Repair a loaded interview", "The guide asks, Why was our onboarding confusing, and which steps should we remove?",
 ["Rewrite three questions around a concrete recent event.", "Identify people missing if recruitment includes only complainants."],
 "Ask what the person was trying to do, what happened at a particular step, and what they did next. Include people who completed smoothly, people who left without complaining, and relevant other groups. Their inclusion explores contrasting experiences rather than guaranteeing a representative prevalence estimate.",
 ["My questions do not assume confusion.", "I asked about actions and goals.", "I inspected recruitment gaps."]),
 exercise("Work with authority", "A VP insists that low dashboard use proves the navigation is poor.",
 ["Draft a respectful response linking one check to a decision.", "Identify what would change your mind and what might support the VP."],
 "Acknowledge the concern, then propose checking whether intended users can find the dashboard and whether they need its information. Difficulty finding it supports examining navigation. Users finding it easily but using another trusted report suggests a different scope. Keep the request tied to resource allocation.",
 ["I made the check concrete.", "I gave the original account a fair test.", "I included an alternative without treating it as fact."])
 ],
 [
 question("Which question contains an unverified premise about experience?", ["What were you trying to do?", "Why was the payment step confusing?", "What happened next?", "When did you last try it?"],1,"The wording assumes confusion. First establish the person's experience through a concrete event.","Identify which question already supplies a diagnosis."),
 question("A majority votes that shipping fees cause exits. What does the vote establish?", ["A causal effect.", "A representative user sample.", "A population rate.", "A preferred team account, with causality still requiring evidence."],3,"Voting reveals or selects a team position. It does not supply empirical support for the cause.","Distinguish agreement from evidence."),
 question("Two teams agree on the data but prefer different outcomes. What should you examine first?", ["Their trade-offs and decision authority.", "Which team has the lower IQ.", "How to collect identical data again.", "How to force a single shared preference."],0,"A priority conflict needs explicit trade-offs and accountable judgment. Repeating agreed evidence may not resolve it.","Ask what kind of disagreement remains.")
 ])

module("Learn through prototypes and revise",
 "Use solution exploration without allowing it to silently lock the frame.",
 [
 ["Making can expose assumptions", "A prototype can reveal a missing constraint, an unclear state, or a different user goal. Let this reshape the account of the problem. Dorst and Cross examined how problem and solution understanding developed together among nine experienced industrial designers. This supports revisiting the frame while exploring, with no universal rule about how much time experts must spend framing."],
 ["Distinguish artifact behavior from reality", "A functioning prototype establishes that the prototype behaves in a certain way. An evaluator completing a scripted task can reveal usability in that situation. Neither alone establishes demand, long-term adoption, or benefit across the intended population. State what your test covers and which assumptions about the real context remain."],
 ["Record revisions", "Keep the earlier account, the new evidence, the change in understanding, and the resulting decision. Update the scope or goal explicitly. If an experiment increases a target metric, examine meaningful costs and alternatives before treating it as proof that the original diagnosis was complete. Outcomes depend on implementation and context as well as the frame."]
 ],
 "Prototype discovery • Showing a shipping estimate requires an address, and shoppers hesitate to supply one before seeing any estimate.\nRevision • Investigate what level of location detail is enough for an honest range and how people interpret its uncertainty.\nThis expands the initial price-visibility frame with a new dependency.",
 [
 exercise("Learn from a prototype", "A mock report works with clean sample data. In actual workflows, different teams use conflicting definitions for the same measure.",
 ["Explain the change in problem understanding.", "Propose a revised scope and a next investigation."],
 "The work may concern shared definitions and data trust in addition to display usability. Inspect the decisions the report supports, where definitions diverge, and who can authorize a common definition or clearly labeled differences. A polished interface does not resolve incompatible measures.",
 ["I named the new evidence.", "I changed a scope or premise explicitly.", "I avoided treating sample data as deployment evidence."]),
 exercise("Interpret a positive result", "A shorter form increases completion in a randomized test. You have no follow-up data on account quality.",
 ["State what the result supports under valid test assumptions.", "Name two claims it cannot yet establish and an outcome to watch."],
 "It supports an effect on measured completion in the tested conditions. It does not uniquely prove confusion caused earlier exits or establish long-term account quality. Watch intended completion, missing or inaccurate information, and subsequent recovery effort.",
 ["I kept the conclusion tied to the measured outcome.", "I avoided unique-cause claims.", "I considered downstream consequences."])
 ],
 [
 question("A prototype reveals a previously unknown dependency. What should happen?", ["Ignore it to protect the brief.", "Declare the prototype invalid.", "Revisit the affected assumptions and scope.", "Restart all research automatically."],2,"New evidence should update the relevant account. The amount of additional work depends on what decision changes.","A revision can be targeted."),
 question("A scripted usability test is completed successfully. Which claim remains unestablished by that result alone?", ["The tested participant completed the scripted task.", "The product has broad market demand.", "The interface supported that observed completion.", "The test produced an observation."],1,"Task completion in a test does not establish demand across a market.","Compare the test context with the broader claim."),
 question("Which revision record is most useful?", ["We aligned and moved forward.", "The new version looks better.", "Leadership preferred the new frame.", "Original account, new evidence, changed premise, changed decision."],3,"Those details preserve why the understanding changed and how the change affected action.","Make the reasoning traceable to evidence.")
 ])

module("Commit, communicate, and know when to stop",
 "Deliver a decision record that supports action and revision.",
 [
 ["Calibrate the stopping point", "More framing is worthwhile when additional learning could change the choice enough to justify cost and delay. Routine reproducible defects may need little inquiry. Expensive or hard-to-reverse decisions deserve more care. Contain urgent incidents while investigating. The goal is a justified commitment with visible limits."],
 ["Write the decision record", "State the group, situation, supported concern, desired improvement, scope, critical assumptions, alternatives, and reason for the chosen action. Name the decision owner and the next action owner. Include what remains unresolved and an observable review trigger. A problem statement can summarize the account, but it cannot carry the whole justification."],
 ["Use a small set of methods", "TOSCA prompts trouble, owner, success, constraints, and actors. Abstraction laddering changes the level of the question through purpose and means. Frame Creation explores persistent situations through history, stakeholders, themes, alternatives, and possible futures. How Might We helps express a challenge, while a question containing a feature may still embed a solution. Methods support judgment and cannot guarantee it."]
 ],
 "Decision record • We will investigate failures among people attempting to pay with method X. Existing records show repeated errors in this group. We will check recovery before a broad redesign. The reliability owner will report findings on Friday. We will revisit scope if records reveal missing completions or if the problem also appears in other methods.\nThis example is fictional.",
 [
 exercise("A five-sentence handoff", "Return to one earlier exercise.",
 ["Write a five-sentence decision record.", "Include a priority, supported premise, unresolved assumption, owner, and review trigger."],
 "A good record lets a colleague understand the choice without attending the meeting. It connects a specific next action to evidence and priorities, names remaining uncertainty, and gives a reason to reopen the question. Several scopes can earn a strong review if their justifications are coherent and proportionate.",
 ["I identified who acts next.", "I connected the action to evidence.", "My trigger can be observed."]),
 exercise("Stop or investigate", "A form button is reproducibly broken in one supported browser. The expected behavior is agreed and a small repair can be verified.",
 ["Choose a next step and explain the appropriate amount of framing.", "Name a discovery that would justify widening the scope."],
 "Repair and verify the bounded defect while checking the supported entry point. Broad discovery may add little to this choice. Widen the investigation if the issue reveals a larger dependency, affects other flows, or the intended behavior turns out to be disputed.",
 ["I matched effort to the decision.", "I preserved verification.", "I named a specific reason to expand."])
 ],
 [
 question("A small reproducible defect has an agreed expected behavior. What is a proportionate next step?", ["Repair and verify the bounded defect.", "Run a mandatory two-week framing workshop.", "Invent three mutually exclusive user needs.", "Wait until every system dependency is mapped."],0,"The known defect and agreed behavior support a bounded repair. Widen inquiry when evidence warrants it.","Consider the uncertainty relevant to this commitment."),
 question("Which review trigger is most actionable?", ["When we feel ready.", "If repeated payment errors persist after the release.", "Whenever the frame seems imperfect.", "When everyone agrees."],1,"Persistence of a defined observable issue can prompt review. Feelings and agreement do not specify an outcome signal.","Choose something a colleague could observe."),
 question("What is a reasonable reason to continue framing?", ["Another workshop is already booked.", "The brief lacks elegant wording.", "The team has not used every framework.", "An unresolved premise could change a costly commitment."],3,"Further inquiry is justified by its potential effect on an important decision, weighed against cost and delay.","Ask what another round of learning could change.")
 ])

module("Use AI and build your own judgment",
 "Audit generated reasoning and transfer the method to unfamiliar situations.",
 [
 ["Use AI as a source of candidates", "AI can propose alternative frames, expose hidden premises, or criticize a draft. Generated accounts do not establish what people using your product actually do. Verify factual claims against appropriate evidence and trace references to their sources. Several models repeating an idea are not necessarily independent corroboration."],
 ["Ask for boundaries and counterevidence", "Supply what is known and ask the model to mark invented examples. Request alternatives that would change an outcome or next action, the assumptions each relies on, and feasible checks. Inspect whether the model preserves the original frame while producing many causes inside it. Keep your own provisional account so you can notice when generated fluency anchors the discussion."],
 ["Practice with a decision journal", "Before a project, record the initial account and the uncertainty driving the next move. Afterward, note what changed your understanding and which decisions changed. Review methods that consumed time without affecting a choice. Judge what was knowable at the time as well as eventual outcomes. A favorable result can coexist with weak reasoning, and a well-supported decision can encounter an unexpected event."]
 ],
 "Useful AI request • Use only the supplied evidence. Mark observations, interpretations, priorities, and missing information. Suggest two plausible frames that change a decision. For each, name a critical premise, possible counterevidence, and a feasible next action. Label every invented example.\nReview • Verify both the claims and the relevance of the proposed checks.",
 [
 exercise("Audit generated certainty", "AI says that low retention proves users lack motivation, that gamification will solve it, and that three generated personas validate the need.",
 ["Identify three unsupported moves.", "Rewrite the advice as an investigation brief and a candidate intervention."],
 "Low return does not prove a motivation mechanism. Gamification is an untested intervention. Generated personas are not participant evidence. Investigate task frequency, product fit, and actual return behavior before choosing a commitment. A gamification idea may remain a candidate if its rationale and consequences are examined.",
 ["I separated cause, solution, and evidence.", "I kept plausible alternatives visible.", "I did not treat generated people as a user study."]),
 exercise("Transfer to your own work", "Choose a real brief you can discuss without including confidential or personal information.",
 ["Complete the course's decision record.", "List what changed since your first interpretation and the next evidence to seek."],
 "Review the record using the capstone rubric. A strong answer names actual evidence, labels unknowns, represents affected people fairly, bounds action, and explains why the next move is worth its cost. If you use a real case, keep sensitive details out of exports you share.",
 ["I traced consequential claims to evidence.", "I made a proportionate commitment.", "I explained what would change my mind."])
 ],
 [
 question("Three AI personas describe the same difficulty. What do they provide?", ["Three independent participant observations.", "A measured population rate.", "Generated possibilities requiring real-world verification.", "A validated problem frame."],2,"Generated personas can suggest hypotheses but do not supply observations from your product's users.","Ask where the behavioral evidence came from."),
 question("Which AI request best preserves evidence boundaries?", ["Explain why users are lazy.", "Mark what is observed, assumed, and invented, then propose checks.", "Prove the executive's idea is right.", "Write ten confident causes without caveats."],1,"Explicit evidence boundaries and checks help inspect the output. You must still verify its claims.","Look for a request that exposes the status of claims."),
 question("A well-supported decision has a poor outcome after an unforeseen external change. How should it be reviewed?", ["The frame was necessarily wrong.", "The outcome proves the research was useless.", "The decision must never be revisited.", "Assess the evidence available then and update for the new context."],3,"Decision quality and outcomes are related without being identical. Review what was knowable and what needs to change now.","Separate hindsight from what informed the original commitment.")
 ])

capstone = dict(id=11,title="Capstone · The reporting dashboard",objective="Make and revise a defensible decision as new evidence arrives.",minutes="90–120",
sections=[
["Your assignment","All organizations, people, figures, and findings in this case are fictional. A director requests an AI assistant for a reporting dashboard because only 18% of eligible accounts opened it last month. You have one week to recommend a scope for the next six weeks. The team can change the interface and coordinate with data operations. It cannot commit another team to a policy change."],
["Evidence round one","The 18% uses accounts as its unit. Eligibility means a feature flag is enabled, not that a person has a reporting responsibility. Three current users report difficulty finding a particular breakdown. Five account managers say some customers use scheduled spreadsheet exports. No representative study of nonusers has been conducted. The director wants visible AI progress for an upcoming demonstration."],
["Evidence round two","In a fictional audit of 30 deliberately selected accounts, 12 have no current reporting owner, 10 use scheduled exports, and 8 rely on the dashboard. Six of those 8 report delaying decisions when metric definitions conflict. Selection was purposeful, so these counts are not population estimates. The exports and dashboard share the definitions problem. Data operations can investigate definitions in two weeks; changing a core definition requires agreement across departments."],
["What you must decide","Recommend a scope, explain which outcome it prioritizes, specify the next checks, and name a review trigger. The evidence leaves several reasonable paths. You may propose a bounded navigation change, a definitions investigation, a narrower AI experiment, or another well-supported option. Explain the cost and limits of your choice."]
],
worked="Work in sequence • Save an initial account before reading round one. Revise after round one, then again after round two. You can inspect all evidence, but preserving your earlier reasoning makes the revision exercise more informative.",
exercises=[
exercise("Before opening the evidence", "Use only the assignment paragraph.",
["Write the pending decision and your initial frame.", "Identify assumptions behind both the 18% measure and the AI request.", "State two plausible alternative frames."],
"A reasonable starting question is whether the low usage represents unmet reporting needs and which intervention deserves six weeks. Eligibility, reporting intent, actual decision needs, and the AI mechanism remain open. Do not diagnose low motivation from the rate.",
["I preserved the unknowns.", "I separated the AI request from the concern.", "My alternatives change the next investigation."]),
exercise("Revise after round one", "Use the assignment and evidence round one.",
["Update the affected groups and boundaries.", "Propose a check that could change allocation.", "Explain how the demonstration incentive affects the decision without assuming bad intent."],
"Distinguish people with a reporting task from all flagged accounts. Examine exports, navigation problems, and the job the dashboard serves. Check responsibility and workflow before treating all nonuse as failed adoption. The demonstration is a stakeholder priority to weigh explicitly.",
["I revised a meaningful premise.", "I represented user and director priorities.", "I explained a feasible next check."]),
exercise("Final decision after round two", "Use all evidence and the scoring rubric below.",
["Write a 400–600 word decision memo with source limits, alternatives, a chosen scope, owner, next action, and revision trigger.", "Include user and business outcomes and a cost to monitor.", "Explain what the purposeful sample cannot tell you."],
"One defensible route is a bounded definitions investigation with data operations, focused on decisions delayed by inconsistent measures. Preserve a small navigation repair if useful. A narrow AI experiment could compare explanation support only after definition provenance is addressed. The sample identifies mechanisms and affected workflows but does not estimate their prevalence among all eligible accounts. A different recommendation can score well if it addresses the evidence, trade-offs, dependencies, and uncertainty.",
["I did not generalize sample percentages.", "My scope connects to a supported need.", "My action has an owner and review trigger."])
],quiz=[])
for idx in [1,2,3,4,5,6,7,8,9,10]:
    capstone["quiz"].append(dict(modules[idx-1]["quiz"][(idx-1)%3]))
modules.append(capstone)

sources=[
["Kelly and Gero · 2022","Review of design frames and differences in how researchers define them.","https://doi.org/10.1017/dsj.2022.25"],
["Ananth, Baer, and Deichmann · 2025","Review across seven literatures on developing problem representations. Published online in 2024.","https://doi.org/10.1177/01492063241291532"],
["Dorst and Cross · 2001","Protocol study of nine experienced designers examining problem and solution development.","https://doi.org/10.1016/S0142-694X(01)00009-6"],
["van der Bijl-Brouwer · 2019","Five agency case studies of evolving frames in public and social innovation.","https://www.sciencedirect.com/science/article/pii/S2405872618301114"],
["Baer, Dirks, and Nickerson · 2013","Theory of organizational impediments and an illustrative structured inquiry process.","https://doi.org/10.1002/smj.2004"],
["Garrette, Phelps, and Sibony · 2018","Practitioner method summary including TOSCA.","https://cracked-it-book.com/wp-content/uploads/CRACKED-IT-4S-method-in-one-page-v2.pdf"],
["LUMA Institute","Practitioner guidance for abstraction laddering.","https://www.luma-institute.com/abstraction-laddering/"],
["Dorst · Frame Innovation","Book developing the Frame Creation method.","https://mitpress.mit.edu/9780262550963/frame-innovation/"],
["Jansson and Smith · 1991","Experiments examining fixation in conceptual design.","https://doi.org/10.1016/0142-694X(91)90003-F"],
["Nickerson · 1998","Review of confirmation bias in evidence seeking and interpretation.","https://doi.org/10.1037/1089-2680.2.2.175"]
]
rubric=[
["Evidence","Claims trace to supplied information, measurement limits are explicit, and invented details are labeled."],
["People and outcomes","Affected groups, their purposes, the prioritized outcome, and trade-offs are represented fairly."],
["Boundaries","The explanation includes relevant influences, while action respects authority and dependencies."],
["Alternatives","Plausible alternatives change an outcome or action and can overlap where the evidence permits."],
["Inquiry","The next check addresses a consequential uncertainty and includes interpretation limits."],
["Commitment and revision","The scope is proportionate, an owner is named, and an observable trigger supports revision."]
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
