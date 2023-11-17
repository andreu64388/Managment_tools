//@ts-ignore
import { ReactComponent as DashboardIcon } from "../../assets/images/dashboard.svg";
//@ts-ignore
import { ReactComponent as DoneIcon } from "../../assets/images/circle_done.svg";
//@ts-ignore
import { ReactComponent as DocumentIcon } from "../../assets/images/document.svg";
//@ts-ignore
import { ReactComponent as CalendarIcon } from "../../assets/images/cal.svg";
//@ts-ignore
import { ReactComponent as PreferencesIcon } from "../../assets/images/preferences.svg";

export const arrOfNav = [
  {
    title: "Dashboard",
    icon: DashboardIcon,
  },
  {
    title: "Completed tasks",
    icon: DoneIcon,
  },
  {
    title: "Details",
    icon: DocumentIcon,
  },
  {
    title: "Calendar",
    icon: CalendarIcon,
  },
  {
    title: "Preferences",
    icon: PreferencesIcon,
  },
];

export const arrStep = [
  {
    title: "Pick Your Template",
    description:
      "Choose your campaign type from the proven plug-and-play templates below",
  },
  {
    title: "Choose your launch date",
    description: "When do you what to launch?",
  },
];
