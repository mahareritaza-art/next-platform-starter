import { MarketingCopilot } from './marketing-copilot';

export const metadata = {
    title: 'Marketing AI'
};

export default function MarketingAIPage() {
    return (
        <div className="flex flex-col gap-8">
            <section className="max-w-3xl">
                <h1 className="mb-4">Marketing AI Copilot</h1>
                <p className="text-lg text-blue-100">
                    This copilot helps you plan strategy, channels, content, and experiments from one brief so your team
                    can move from idea to execution quickly.
                </p>
            </section>
            <MarketingCopilot />
        </div>
    );
}
