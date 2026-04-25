function formatHours(quantity) {
  const hrs = Math.floor(quantity);
  const mins = Math.round((quantity - hrs) * 60);

  return `${hrs} hr ${mins} min`;
}

export default formatHours;