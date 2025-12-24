
export type DeviceType = 'laptop' | 'tv' | 'ac' | 'washing-machine' | 'network' | 'other';

export interface DiagnosticSolution {
  title: string;
  description: string;
  difficulty: 'Lako' | 'Srednje' | 'Teško';
  steps: string[];
}

export interface BookingFormData {
  type: 'phone' | 'visit';
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  address?: string;
  problemSummary: string;
}
