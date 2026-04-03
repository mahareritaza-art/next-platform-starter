'use client';

import { useMemo, useState } from 'react';

const CHANNELS = ['SEO', 'Email', 'Paid Social', 'Partnerships', 'Webinars', 'Community'];

function makePlan({ company, audience, goal, budget, tone, offer }) {
    const weeklyBudget = Math.max(250, Math.round((Number(budget) || 3000) / 4));

    return {
        positioning: `${company} helps ${audience} achieve ${goal} with ${offer}.`,
        campaign: {
            name: `${goal} Sprint`,
            message: `Use a ${tone.toLowerCase()} voice to connect ${offer} to a measurable business outcome.`
        },
        channels: CHANNELS.map((channel, index) => ({
            channel,
            objective: `Drive ${index % 2 ? 'pipeline' : 'awareness'} among ${audience}`,
            budget: `$${Math.round(weeklyBudget * (0.25 - index * 0.02 > 0.1 ? 0.25 - index * 0.02 : 0.1))}/week`,
            experiment: `Test ${tone.toLowerCase()} creative with one clear CTA related to ${goal}.`
        })),
        contentIdeas: [
            `Founder POV post: Why ${goal} matters for ${audience}`,
            `Case-study breakdown showing how ${offer} improved results`,
            `Short webinar: 3 frameworks to improve ${goal}`,
            `Email mini-course with actionable templates`
        ],
        scorecard: [
            'Top-of-funnel: CTR, reach, branded search lift',
            'Mid-funnel: landing page CVR, qualified leads',
            'Revenue: opportunity rate, CAC payback period'
        ]
    };
}

export function MarketingCopilot() {
    const [formData, setFormData] = useState({
        company: 'Acme AI',
        audience: 'B2B marketing teams',
        goal: 'more product-qualified leads',
        budget: '4000',
        tone: 'Confident',
        offer: 'an AI workspace that automates campaign execution'
    });

    const plan = useMemo(() => makePlan(formData), [formData]);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
            <form className="flex flex-col gap-3 p-4 rounded bg-white/10">
                <label className="text-sm font-semibold" htmlFor="company">Company</label>
                <input id="company" className="input" name="company" value={formData.company} onChange={handleChange} />

                <label className="text-sm font-semibold" htmlFor="audience">Audience</label>
                <input id="audience" className="input" name="audience" value={formData.audience} onChange={handleChange} />

                <label className="text-sm font-semibold" htmlFor="goal">Primary goal</label>
                <input id="goal" className="input" name="goal" value={formData.goal} onChange={handleChange} />

                <label className="text-sm font-semibold" htmlFor="offer">Offer</label>
                <textarea
                    id="offer"
                    className="input min-h-20"
                    name="offer"
                    value={formData.offer}
                    onChange={handleChange}
                />

                <label className="text-sm font-semibold" htmlFor="budget">Monthly budget (USD)</label>
                <input id="budget" className="input" name="budget" type="number" min="0" value={formData.budget} onChange={handleChange} />

                <label className="text-sm font-semibold" htmlFor="tone">Brand tone</label>
                <select id="tone" className="input" name="tone" value={formData.tone} onChange={handleChange}>
                    <option>Confident</option>
                    <option>Practical</option>
                    <option>Playful</option>
                    <option>Premium</option>
                </select>
            </form>

            <section className="flex flex-col gap-5">
                <article className="p-5 rounded bg-white/10">
                    <h2 className="mb-3 text-xl">1) Positioning</h2>
                    <p>{plan.positioning}</p>
                </article>

                <article className="p-5 rounded bg-white/10">
                    <h2 className="mb-3 text-xl">2) Campaign brief</h2>
                    <p className="mb-2"><strong>Name:</strong> {plan.campaign.name}</p>
                    <p>{plan.campaign.message}</p>
                </article>

                <article className="p-5 rounded bg-white/10">
                    <h2 className="mb-3 text-xl">3) Channel plan</h2>
                    <ul className="space-y-2">
                        {plan.channels.map((item) => (
                            <li key={item.channel} className="p-3 rounded bg-black/20">
                                <p className="font-semibold">{item.channel} · {item.budget}</p>
                                <p className="text-sm text-blue-100">{item.objective}</p>
                                <p className="text-sm text-blue-200">Experiment: {item.experiment}</p>
                            </li>
                        ))}
                    </ul>
                </article>

                <article className="p-5 rounded bg-white/10">
                    <h2 className="mb-3 text-xl">4) Weekly content queue</h2>
                    <ul className="pl-5 list-disc space-y-1">
                        {plan.contentIdeas.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </article>

                <article className="p-5 rounded bg-white/10">
                    <h2 className="mb-3 text-xl">5) Scorecard</h2>
                    <ul className="pl-5 list-disc space-y-1">
                        {plan.scorecard.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </article>
            </section>
        </div>
    );
}
