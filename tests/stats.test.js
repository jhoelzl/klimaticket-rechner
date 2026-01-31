import { describe, it, expect, beforeEach, vi } from 'vitest';

// Constants from stats.js
const CARBON_CONFIG = {
    publicTransport: 0.089,
    car: 0.192,
    plane: 0.285
};

// Mock user settings
let userStartDate = new Date(2025, 0, 23);
let userEndDate = new Date(2026, 0, 22);

// Core functions from stats.js
function isValidTrip(trip) {
    const tripDate = new Date(trip.date + 'T00:00:00');
    return tripDate >= userStartDate && tripDate <= userEndDate;
}

function estimateDistance(route, providedDistance, states) {
    if (providedDistance && providedDistance > 0) {
        return parseFloat(providedDistance);
    }

    let stateCount = 0;
    if (states && Array.isArray(states)) {
        stateCount = states.length;
    }

    if (stateCount >= 3) {
        return 300;
    } else if (stateCount === 2) {
        return 100;
    }
    return 10;
}

function calculateCarbonStats(trips) {
    const validTrips = trips.filter(trip => isValidTrip(trip));

    if (validTrips.length === 0) {
        return {
            averageCarbonPerTrip: 0,
            totalCarbonSavings: 0,
            carEquivalent: 0,
            planeEquivalent: 0
        };
    }

    let totalCarbon = 0;
    validTrips.forEach(trip => {
        const distance = estimateDistance(trip.route, trip.distance, trip.states);
        const carbon = distance * CARBON_CONFIG.publicTransport;
        totalCarbon += carbon;
    });

    const averageCarbonPerTrip = validTrips.length > 0 ? totalCarbon / validTrips.length : 0;

    const carEmissions = validTrips.length * averageCarbonPerTrip * (CARBON_CONFIG.car / CARBON_CONFIG.publicTransport);
    const planeEmissions = validTrips.length * averageCarbonPerTrip * (CARBON_CONFIG.plane / CARBON_CONFIG.publicTransport);

    const carbonSavingsVsCar = carEmissions - totalCarbon;
    const carbonSavingsVsPlane = planeEmissions - totalCarbon;

    const carEquivalentKm = carbonSavingsVsCar / CARBON_CONFIG.car;
    const planeEquivalentKm = carbonSavingsVsPlane / CARBON_CONFIG.plane;

    return {
        averageCarbonPerTrip: averageCarbonPerTrip,
        totalCarbonSavings: totalCarbon,
        carEmissions: carEmissions,
        planeEmissions: planeEmissions,
        carbonSavingsVsCar: carbonSavingsVsCar,
        carbonSavingsVsPlane: carbonSavingsVsPlane,
        carEquivalentKm: carEquivalentKm,
        planeEquivalentKm: planeEquivalentKm
    };
}

describe('Stats Module - Trip Validation', () => {
    describe('isValidTrip', () => {
        it('should return true for trips within valid date range', () => {
            const trip = { date: '2025-06-15' };
            expect(isValidTrip(trip)).toBe(true);
        });

        it('should return false for trips before start date', () => {
            const trip = { date: '2024-12-31' };
            expect(isValidTrip(trip)).toBe(false);
        });

        it('should return false for trips after end date', () => {
            const trip = { date: '2026-02-01' };
            expect(isValidTrip(trip)).toBe(false);
        });

        it('should return true for trips on start date', () => {
            const trip = { date: '2025-01-23' };
            expect(isValidTrip(trip)).toBe(true);
        });

        it('should return true for trips on end date', () => {
            const trip = { date: '2026-01-22' };
            expect(isValidTrip(trip)).toBe(true);
        });
    });
});

describe('Stats Module - Distance Estimation', () => {
    describe('estimateDistance', () => {
        it('should return provided distance if greater than 0', () => {
            const distance = estimateDistance('Vienna - Salzburg', 250, ['Vienna']);
            expect(distance).toBe(250);
        });

        it('should return 300 km for 3 or more states', () => {
            const distance = estimateDistance('Route', 0, ['Vienna', 'Salzburg', 'Tyrol']);
            expect(distance).toBe(300);
        });

        it('should return 100 km for exactly 2 states', () => {
            const distance = estimateDistance('Route', 0, ['Vienna', 'Salzburg']);
            expect(distance).toBe(100);
        });

        it('should return 10 km for 1 or no states', () => {
            const distance = estimateDistance('Route', 0, ['Vienna']);
            expect(distance).toBe(10);
        });

        it('should return 10 km for empty states array', () => {
            const distance = estimateDistance('Route', 0, []);
            expect(distance).toBe(10);
        });

        it('should return 10 km for null states', () => {
            const distance = estimateDistance('Route', 0, null);
            expect(distance).toBe(10);
        });

        it('should return provided distance as float', () => {
            const distance = estimateDistance('Route', '150.5', ['Vienna']);
            expect(distance).toBe(150.5);
        });

        it('should ignore provided distance if 0 or negative', () => {
            const distance1 = estimateDistance('Route', 0, ['Vienna', 'Salzburg']);
            const distance2 = estimateDistance('Route', -50, ['Vienna', 'Salzburg']);
            expect(distance1).toBe(100);
            expect(distance2).toBe(100);
        });
    });
});

describe('Stats Module - Carbon Calculation', () => {
    describe('calculateCarbonStats', () => {
        it('should return zeros for empty trips array', () => {
            const stats = calculateCarbonStats([]);
            expect(stats.averageCarbonPerTrip).toBe(0);
            expect(stats.totalCarbonSavings).toBe(0);
        });

        it('should calculate carbon stats for single trip', () => {
            const trips = [
                {
                    id: 1,
                    date: '2025-06-15',
                    route: 'Vienna - Salzburg',
                    distance: 300,
                    states: ['Vienna', 'Salzburg']
                }
            ];
            const stats = calculateCarbonStats(trips);
            expect(stats.averageCarbonPerTrip).toBeGreaterThan(0);
            expect(stats.totalCarbonSavings).toBe(300 * CARBON_CONFIG.publicTransport);
            expect(stats.carEquivalentKm).toBeGreaterThan(0);
            expect(stats.planeEquivalentKm).toBeGreaterThan(0);
        });

        it('should calculate average carbon per trip correctly', () => {
            const trips = [
                {
                    id: 1,
                    date: '2025-06-15',
                    route: 'Vienna - Salzburg',
                    distance: 100,
                    states: ['Vienna']
                },
                {
                    id: 2,
                    date: '2025-07-15',
                    route: 'Vienna - Linz',
                    distance: 200,
                    states: ['Vienna', 'Salzburg']
                }
            ];
            const stats = calculateCarbonStats(trips);
            const expectedTotal = (100 * CARBON_CONFIG.publicTransport) + (200 * CARBON_CONFIG.publicTransport);
            expect(stats.totalCarbonSavings).toBe(expectedTotal);
            expect(stats.averageCarbonPerTrip).toBe(expectedTotal / 2);
        });

        it('should estimate distance for trips without provided distance', () => {
            const trips = [
                {
                    id: 1,
                    date: '2025-06-15',
                    route: 'Vienna - Salzburg',
                    distance: null,
                    states: ['Vienna', 'Salzburg']
                }
            ];
            const stats = calculateCarbonStats(trips);
            // Should use estimated distance of 100 km for 2 states
            const expectedCarbon = 100 * CARBON_CONFIG.publicTransport;
            expect(stats.totalCarbonSavings).toBe(expectedCarbon);
        });

        it('should filter out invalid trips (outside date range)', () => {
            const trips = [
                {
                    id: 1,
                    date: '2025-06-15',
                    route: 'Vienna - Salzburg',
                    distance: 100,
                    states: ['Vienna']
                },
                {
                    id: 2,
                    date: '2024-01-01', // Outside range
                    route: 'Vienna - Linz',
                    distance: 200,
                    states: ['Vienna', 'Salzburg']
                }
            ];
            const stats = calculateCarbonStats(trips);
            // Should only include first trip
            const expectedCarbon = 100 * CARBON_CONFIG.publicTransport;
            expect(stats.totalCarbonSavings).toBe(expectedCarbon);
        });

        it('should calculate car and plane equivalents correctly', () => {
            const trips = [
                {
                    id: 1,
                    date: '2025-06-15',
                    route: 'Vienna - Salzburg',
                    distance: 300,
                    states: ['Vienna', 'Salzburg', 'Tyrol']
                }
            ];
            const stats = calculateCarbonStats(trips);
            
            const publicTransportCarbon = 300 * CARBON_CONFIG.publicTransport;
            const carCarbon = 300 * CARBON_CONFIG.car;
            const planeCarbon = 300 * CARBON_CONFIG.plane;
            
            expect(stats.carEquivalentKm).toBeCloseTo((carCarbon - publicTransportCarbon) / CARBON_CONFIG.car, 2);
            expect(stats.planeEquivalentKm).toBeCloseTo((planeCarbon - publicTransportCarbon) / CARBON_CONFIG.plane, 2);
        });

        it('should return all expected properties', () => {
            const trips = [
                {
                    id: 1,
                    date: '2025-06-15',
                    route: 'Vienna - Salzburg',
                    distance: 100,
                    states: ['Vienna']
                }
            ];
            const stats = calculateCarbonStats(trips);
            expect(stats).toHaveProperty('averageCarbonPerTrip');
            expect(stats).toHaveProperty('totalCarbonSavings');
            expect(stats).toHaveProperty('carEmissions');
            expect(stats).toHaveProperty('planeEmissions');
            expect(stats).toHaveProperty('carbonSavingsVsCar');
            expect(stats).toHaveProperty('carbonSavingsVsPlane');
            expect(stats).toHaveProperty('carEquivalentKm');
            expect(stats).toHaveProperty('planeEquivalentKm');
        });
    });
});
