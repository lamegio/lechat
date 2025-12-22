import { ReactNode } from "react";

interface Tab {
  key: string;
  label: ReactNode;
}

interface SegmentedControlProps<T extends string> {
  tabs: Tab[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  className?: string;
}

export function SegmentedControl<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}: SegmentedControlProps<T>) {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="inline-flex bg-gray-200/30 dark:bg-gray-800/30 rounded-lg p-1 border border-gray-300/40 dark:border-gray-600/40">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key as T)}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200
              ${
                activeTab === tab.key
                  ? "bg-theme-color text-white shadow-sm"
                  : "text-font-color-secondary hover:text-font-color"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
