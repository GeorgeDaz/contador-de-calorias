export type Category = {
  id: number;
  name: string;
};

export type Activity = {
  category: number; // Changed from string to number
  name: string; // Name of the activity or food item
  calories: number; // Number of calories associated with the activity or food item
};
