// components/DynamicComponent.tsx

'use client'
// biome-ignore lint/style/useImportType: <explanation>
import React, { useEffect, useState } from 'react';

interface DynamicComponentProps {
  componentName: string;
  [key: string]: any; // Allow any additional props
}

const DynamicComponent: React.FC<DynamicComponentProps> = ({ componentName, ...props }) => {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Dynamically import the component
    import(`./${componentName}`)
      .then((module) => setComponent(() => module.default))
      .catch((error) => console.error(`Error loading component ${componentName}:`, error));
  }, [componentName]);

  if (!Component) {
    return <div>Loading...</div>; // Or some other loading indicator
  }

  return <Component {...props} />;
};

export default DynamicComponent;