import type {LucideIcon} from "lucide-react";
import React from "react";

interface FeatureCardProps {
  title: string;
  content: string;
  icon: LucideIcon;
  iconBg: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
                                                   title,
                                                   content,
                                                   icon: Icon,
                                                   iconBg,
                                                 }) => {
  return (
    <div
      className="bg-white border border-gray-200 flex flex-col items-start rounded-2xl shadow-md p-6 hover:shadow-lg hover:border-blue-500 transition duration-200 hover:-translate-y-1">
      <div className="flex items-center justify-between gap-2">
        <span
          className={`text-${iconBg}-500 bg-${iconBg}-100 rounded-xl px-4 py-2 text-3xl mb-4`}
        >
          <Icon className="w-6 h-6"/>
        </span>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-500">
          {title}
        </h3>
      </div>
      <p className="text-gray-600 text-sm text-left">{content}</p>
    </div>
  );
};

export default FeatureCard;
