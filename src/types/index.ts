export type Category = {
  id: number;
  name: string;
};

export type Activity = {
  id: string; // Unique identifier for the activity
  category: number; // Changed from string to number
  name: string; // Name of the activity or food item
  calories: number; // Number of calories associated with the activity or food item
};
