/* Registered pharmacists by state: PCI figures as on 15.12.2021 (CBHI National Health Profile 2022, Table 5.1.5) ÷ Census 2011 population (NHP 2022, Table 1.1.2(a)). */
export type StateRow = { state: string; pharmacists: number; population: number; perLakh: number };
export const PHARMACISTS_BY_STATE: StateRow[] = [
  { state: "Chandigarh", pharmacists: 4631, population: 1055450, perLakh: 438.8 },
  { state: "Goa", pharmacists: 4614, population: 1458545, perLakh: 316.3 },
  { state: "Maharashtra", pharmacists: 304172, population: 112374333, perLakh: 270.7 },
  { state: "Puducherry", pharmacists: 2855, population: 1247953, perLakh: 228.8 },
  { state: "Kerala", pharmacists: 74502, population: 33470534, perLakh: 222.6 },
  { state: "Gujarat", pharmacists: 127634, population: 61026648, perLakh: 209.1 },
  { state: "Punjab", pharmacists: 53518, population: 27743338, perLakh: 192.9 },
  { state: "Delhi", pharmacists: 30905, population: 16787941, perLakh: 184.1 },
  { state: "Uttarakhand", pharmacists: 18500, population: 10086292, perLakh: 183.4 },
  { state: "Haryana", pharmacists: 36655, population: 25351462, perLakh: 144.6 },
  { state: "Andhra Pradesh + Telangana", pharmacists: 116674, population: 84580777, perLakh: 137.9 },
  { state: "Himachal Pradesh", pharmacists: 9082, population: 6864602, perLakh: 132.3 },
  { state: "Tamil Nadu", pharmacists: 87929, population: 72527611, perLakh: 121.2 },
  { state: "Karnataka", pharmacists: 67548, population: 61095297, perLakh: 110.6 },
  { state: "West Bengal", pharmacists: 89630, population: 91276115, perLakh: 98.2 },
  { state: "Tripura", pharmacists: 3357, population: 3673917, perLakh: 91.4 },
  { state: "Madhya Pradesh", pharmacists: 59242, population: 72626809, perLakh: 81.6 },
  { state: "Odisha", pharmacists: 34050, population: 41974218, perLakh: 81.1 },
  { state: "Nagaland", pharmacists: 1553, population: 1978502, perLakh: 78.5 },
  { state: "Chhattisgarh", pharmacists: 19955, population: 25545198, perLakh: 78.1 },
  { state: "Rajasthan", pharmacists: 51540, population: 68548437, perLakh: 75.2 },
  { state: "Mizoram", pharmacists: 594, population: 1097206, perLakh: 54.1 },
  { state: "Meghalaya", pharmacists: 1395, population: 2966889, perLakh: 47.0 },
  { state: "Sikkim", pharmacists: 281, population: 610577, perLakh: 46.0 },
  { state: "Uttar Pradesh", pharmacists: 91278, population: 199812341, perLakh: 45.7 },
  { state: "Assam", pharmacists: 12928, population: 31205576, perLakh: 41.4 },
  { state: "Manipur", pharmacists: 989, population: 2855794, perLakh: 34.6 },
  { state: "Arunachal Pradesh", pharmacists: 359, population: 1383727, perLakh: 25.9 },
  { state: "Bihar", pharmacists: 24341, population: 104099452, perLakh: 23.4 },
  { state: "Jharkhand", pharmacists: 3487, population: 32988134, perLakh: 10.6 },
];
export const INDIA_PHARMACISTS = 1334198;
export const INDIA_POPULATION_2011 = 1210854977;
export const DATA_NOTES = "Gujarat includes Daman & Diu and Dadra & Nagar Haveli; Kerala includes Lakshadweep; Tamil Nadu includes Andaman & Nicobar; Andhra Pradesh and Telangana are combined (their pharmacist counts summed) against the undivided Andhra Pradesh population of 2011. PCI data for Karnataka, Uttar Pradesh, Himachal Pradesh, Jharkhand, Madhya Pradesh, Punjab and Telangana runs to 31.12.2019; for Maharashtra, Bihar, Odisha, Rajasthan and Uttarakhand to 31.12.2020. Jammu & Kashmir and Ladakh: pharmacist count not available in the source.";
