export const validatePercentageSum = (data: any) => {
    if (!data || !data.countries) return false;
    const total = data.countries.reduce((sum: number, item: any) => sum + (item.percentage || 0), 0);
    return total === 100;
  };
  