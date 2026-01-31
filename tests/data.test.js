import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => {
            store[key] = value.toString();
        },
        removeItem: (key) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        }
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

// Mock data functions (extracted from data.js)
function normalizeTrip(trip) {
    const states = Array.isArray(trip.states)
        ? trip.states
        : Array.isArray(trip.bundeslaender)
            ? trip.bundeslaender
            : [];
    return { ...trip, states };
}

function normalizeTrips(trips) {
    return trips.map(normalizeTrip);
}

function prepareTripForStorage(trip) {
    const { states, ...rest } = trip;
    return {
        ...rest,
        bundeslaender: Array.isArray(states) && states.length > 0 ? states : ['Salzburg']
    };
}

function getLocalTrips() {
    const data = localStorage.getItem('trips');
    const trips = data ? JSON.parse(data) : [];
    return normalizeTrips(trips);
}

describe('Data Module - Trip Normalization', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe('normalizeTrip', () => {
        it('should normalize trip with states array', () => {
            const trip = { id: 1, date: '2025-01-31', states: ['Vienna', 'Salzburg'] };
            const normalized = normalizeTrip(trip);
            expect(normalized.states).toEqual(['Vienna', 'Salzburg']);
        });

        it('should normalize trip with bundeslaender array', () => {
            const trip = { id: 1, date: '2025-01-31', bundeslaender: ['Vienna', 'Salzburg'] };
            const normalized = normalizeTrip(trip);
            expect(normalized.states).toEqual(['Vienna', 'Salzburg']);
        });

        it('should create empty states array if neither states nor bundeslaender exist', () => {
            const trip = { id: 1, date: '2025-01-31' };
            const normalized = normalizeTrip(trip);
            expect(normalized.states).toEqual([]);
        });

        it('should preserve all trip properties', () => {
            const trip = {
                id: 1,
                date: '2025-01-31',
                route: 'Vienna - Salzburg',
                distance: 300,
                cost: 10,
                states: ['Vienna']
            };
            const normalized = normalizeTrip(trip);
            expect(normalized.id).toBe(1);
            expect(normalized.date).toBe('2025-01-31');
            expect(normalized.route).toBe('Vienna - Salzburg');
            expect(normalized.distance).toBe(300);
            expect(normalized.cost).toBe(10);
        });
    });

    describe('normalizeTrips', () => {
        it('should normalize multiple trips', () => {
            const trips = [
                { id: 1, date: '2025-01-31', states: ['Vienna'] },
                { id: 2, date: '2025-02-01', bundeslaender: ['Salzburg'] }
            ];
            const normalized = normalizeTrips(trips);
            expect(normalized).toHaveLength(2);
            expect(normalized[0].states).toEqual(['Vienna']);
            expect(normalized[1].states).toEqual(['Salzburg']);
        });

        it('should return empty array for empty input', () => {
            const normalized = normalizeTrips([]);
            expect(normalized).toEqual([]);
        });
    });

    describe('prepareTripForStorage', () => {
        it('should convert states to bundeslaender format', () => {
            const trip = { id: 1, date: '2025-01-31', states: ['Vienna', 'Salzburg'], cost: 10 };
            const prepared = prepareTripForStorage(trip);
            expect(prepared.bundeslaender).toEqual(['Vienna', 'Salzburg']);
            expect(prepared.states).toBeUndefined();
        });

        it('should use default Salzburg if states array is empty', () => {
            const trip = { id: 1, date: '2025-01-31', states: [], cost: 10 };
            const prepared = prepareTripForStorage(trip);
            expect(prepared.bundeslaender).toEqual(['Salzburg']);
        });

        it('should preserve all other properties', () => {
            const trip = { id: 1, date: '2025-01-31', states: ['Vienna'], cost: 10, route: 'Test Route' };
            const prepared = prepareTripForStorage(trip);
            expect(prepared.id).toBe(1);
            expect(prepared.date).toBe('2025-01-31');
            expect(prepared.cost).toBe(10);
            expect(prepared.route).toBe('Test Route');
        });
    });

    describe('getLocalTrips', () => {
        it('should return empty array when no trips in localStorage', () => {
            const trips = getLocalTrips();
            expect(trips).toEqual([]);
        });

        it('should retrieve and normalize trips from localStorage', () => {
            const storedTrips = [
                { id: 1, date: '2025-01-31', bundeslaender: ['Vienna'] }
            ];
            localStorage.setItem('trips', JSON.stringify(storedTrips));
            const trips = getLocalTrips();
            expect(trips).toHaveLength(1);
            expect(trips[0].states).toEqual(['Vienna']);
        });

        it('should handle malformed JSON in localStorage', () => {
            localStorage.setItem('trips', 'invalid json');
            expect(() => getLocalTrips()).toThrow();
        });
    });
});
