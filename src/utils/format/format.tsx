export const formatDate = (dateString: string): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const day = date.getDate();

  return `${month} ${day}`;
};

export const formatDateWithSpan = (dateString: string): React.ReactElement => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const day = date.getDate();

  return (
    <>
      {day} <span>{month}</span>
    </>
  );
};


export const formatDuration = (duration?: number | null) => {
  if (!duration) return null;
  if (duration === 1) {
    return '1 minute';
  } else if (duration < 60) {
    return `${duration} minutes`;
  } else if (duration >= 60 && duration <= 90) {
    return 'about an hour';
  } else {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    if (minutes === 0) {
      return `about ${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    } else {
      return `about ${hours} ${hours === 1 ? 'hour' : 'hours'} ${minutes} minutes`;
    }
  }
};

export const formatDateMonth = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return formattedDate;
};


export const getTaskLabel = (dateString: string) => {
  const today = new Date();
  const taskDate = new Date(dateString);


  if (
    today.getFullYear() === taskDate.getFullYear() &&
    today.getMonth() === taskDate.getMonth() &&
    today.getDate() === taskDate.getDate()
  ) {
    return 'Task for today:';
  }


  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  if (
    tomorrow.getFullYear() === taskDate.getFullYear() &&
    tomorrow.getMonth() === taskDate.getMonth() &&
    tomorrow.getDate() === taskDate.getDate()
  ) {
    return 'Task for tomorrow:';
  }


  const twoDaysLater = new Date(today);
  twoDaysLater.setDate(today.getDate() + 2);
  if (taskDate <= twoDaysLater) {
    return 'Coming soon:';
  }

  return 'Task soon:';
};

export const getMonthName = (date: Date): string => {
  const monthNumber = date.getMonth();
  const monthName = date.toLocaleString('default', { month: 'long' });
  return monthName;
};

export const getMonthRange = (startDate: string, deadline: string): string => {
  const startDateObject = new Date(startDate);
  const deadlineObject = new Date(deadline);

  const startMonth = getMonthName(startDateObject);
  const endMonth = getMonthName(deadlineObject);

  if (startMonth === endMonth) {
    return startMonth;
  } else {
    return `${startMonth} - ${endMonth}`;
  }
};