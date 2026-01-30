// Configuration constants
const DEFAULT_TICKET_COST = 1400;
const DEFAULT_START_DATE = new Date(2025, 0, 23);
const DEFAULT_END_DATE = new Date(2026, 0, 22);
const SUPABASE_URL = 'https://qfkfcirfwlfjscevxilu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_REFOWIFpP1IbO5rEARlXUA_Z5Qw--d0';
const DEFAULT_LANGUAGE = 'en';

// Global state
let supabase = null;
let currentUser = null;
let userTicketCost = DEFAULT_TICKET_COST;
let userStartDate = DEFAULT_START_DATE;
let userEndDate = DEFAULT_END_DATE;
let showOnlyNoState = false;
let showOnlyOutOfRange = false;
let showOnlyNoDistance = false;
let allTripsForHeatmap = [];
let currentHeatmapDate = new Date();
let currentLanguage = DEFAULT_LANGUAGE;
let currentYearView = new Date().getFullYear();
let currentEditTrip = null;
let touchStartY = 0;
let isRefreshing = false;

// Shared date value
const today = new Date().toISOString().split('T')[0];
