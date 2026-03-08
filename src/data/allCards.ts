/**
 * allCards.ts — Aggregates all 150 cards from cards.ts + cards_extra1..10
 * Provides the same utility functions as cards.ts but for all 150 cards.
 */

import type { Card } from '@/types/card';
import { cards } from './cards';
import { cardsExtra1 } from './cards_extra1';
import { cardsExtra2 } from './cards_extra2';
import { cardsExtra3 } from './cards_extra3';
import { cardsExtra4 } from './cards_extra4';
import { cardsExtra5 } from './cards_extra5';
import { cardsExtra7 } from './cards_extra7';
import { cardsExtra8 } from './cards_extra8';
import { cardsExtra9 } from './cards_extra9';
import { cardsExtra10 } from './cards_extra10';

// Combine all cards, ensuring no duplicates by ID
const rawCards = [
    ...cards,
    ...cardsExtra1,
    ...cardsExtra2,
    ...cardsExtra3,
    ...cardsExtra4,
    ...cardsExtra5,
    ...cardsExtra7,
    ...cardsExtra8,
    ...cardsExtra9,
    ...cardsExtra10
];

// Deduplicate and re-number to ensure unique sequence
const seenIds = new Set<string>();
export const allCards: Card[] = rawCards
    .filter(c => {
        if (seenIds.has(c.id)) return false;
        seenIds.add(c.id);
        return true;
    })
    .map((c, index) => ({
        ...c,
        number: index + 1 // Re-index for consistent 1-150 sequence
    }));

// ─── Utility Functions ───────────────────────────────────────────────────────

export const getCardById = (id: string): Card | undefined =>
    allCards.find(c => c.id === id);

export const getCardByNumber = (num: number): Card | undefined =>
    allCards.find(c => c.number === num);

export const getCardsByLevel = (level: string): Card[] =>
    allCards.filter(c => c.level === level);

export const getCardsByTag = (tag: string): Card[] =>
    allCards.filter(c => c.tags && Array.isArray(c.tags) && c.tags.includes(tag));



export const getCardsByFrequency = (freq: string): Card[] =>
    allCards.filter(c => c.frequency === freq);

export const getAllTags = (): string[] => {
    const tags = new Set<string>();
    allCards.forEach(c => {
        if (c.tags && Array.isArray(c.tags)) {
            c.tags.forEach(t => tags.add(t));
        }
    });
    return Array.from(tags).sort();
};

export const getAllLevels = (): string[] =>
    Array.from(new Set(allCards.map(c => c.level))).sort();

export const getPrerequisites = (cardId: string): Card[] => {
    const card = getCardById(cardId);
    if (!card) return [];
    return allCards.filter(c => card.linkedCards?.prerequisites?.includes(c.id) ?? false);
};

export const getNextSteps = (cardId: string): Card[] => {
    const card = getCardById(cardId);
    if (!card) return [];
    return allCards.filter(c => card.linkedCards?.nextSteps?.some(ns => ns.id === c.id) ?? false);
};

export const searchCards = (query: string): Card[] => {
    const q = query.toLowerCase();
    return allCards.filter(c =>
        c.title.toLowerCase().includes(q) ||
        (c.titleAr ?? '').includes(q) ||
        (c.definition?.summary ?? '').toLowerCase().includes(q) ||
        (c.tags && Array.isArray(c.tags) && c.tags.some(t => t.toLowerCase().includes(q)))
    );
};

// Default export for backwards compat
export default allCards;
