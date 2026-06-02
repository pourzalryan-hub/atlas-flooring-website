interface Step {
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: Step[];
  dark?: boolean;
}

export default function ProcessSteps({ steps, dark = false }: ProcessStepsProps) {
  const titleColor = dark ? "text-white" : "text-[#1f2937]";
  const descColor = dark ? "text-white/70" : "text-[#4b5563]";
  const lineColor = dark ? "bg-gold/30" : "bg-gold/40";

  return (
    <div className="relative">
      {/* Connector line — desktop */}
      <div className={`hidden md:block absolute top-8 left-0 right-0 h-0.5 ${lineColor}`} />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {steps.map((step, i) => (
          <div key={i} className="relative flex flex-col items-center text-center">
            {/* Number circle */}
            <div className="relative z-10 w-16 h-16 rounded-full bg-gold flex items-center justify-center mb-5 shadow-md">
              <span className="font-playfair text-2xl text-white font-bold">
                {i + 1}
              </span>
            </div>
            <h3 className={`font-playfair text-lg mb-2 ${titleColor}`}>{step.title}</h3>
            <p className={`font-lato text-sm leading-relaxed ${descColor}`}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
