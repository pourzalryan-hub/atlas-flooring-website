interface Step {
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: Step[];
}

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <div className="relative">
      {/* Connector line — desktop */}
      <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gold/30" />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {steps.map((step, i) => (
          <div key={i} className="relative flex flex-col items-center text-center">
            {/* Number circle */}
            <div className="relative z-10 w-16 h-16 rounded-full bg-gold flex items-center justify-center mb-5 shadow-md">
              <span className="font-playfair text-2xl text-white font-bold">
                {i + 1}
              </span>
            </div>
            <h3 className="font-playfair text-lg text-white mb-2">{step.title}</h3>
            <p className="font-lato text-sm text-white/70 leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
