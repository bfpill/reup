import { Breadcrumb } from "@/components/breadcrumb";
import { SummerDaysGraph } from "@/components/custom/DaysOfSummer";

import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Breadcrumb />
      {children}
    </React.Fragment>
  );
}
