/**
 * allCards.ts — Aggregates all 150 cards from cards.ts + cards_extra1..10
 * Provides the same utility functions as cards.ts but for all 150 cards.
 */

import type { Card } from '@/types/card';
import { cards as cards1_45 } from './cards';
import { cardsExtra1 } from './cards_extra1';
import { cardsExtra2 } from './cards_extra2';
import { cardsExtra3 } from './cards_extra3';
import { cardsExtra4 } from './cards_extra4';
import { cardsExtra5 } from './cards_extra5';
import { cardsExtra6 } from './cards_extra6';
import { cardsExtra7 } from './cards_extra7';
import { cardsExtra8 } from './cards_extra8';
import { cardsExtra9 } from './cards_extra9';
import { cardsExtra10 } from './cards_extra10';

export const allCards: Card[] = [
    ...cards1_45,
    ...cardsExtra1,
    ...cardsExtra2,
    ...cardsExtra3,
    ...cardsExtra4,
    ...cardsExtra5,
    ...cardsExtra6,
    ...cardsExtra7,
    ...cardsExtra8,
    ...cardsExtra9,
    ...cardsExtra10,
];

// ─── Utility Functions ───────────────────────────────────────────────────────

export const getCardById = (id: string): Card | undefined =>
    allCards.find(c => c.id === id);

export const getCardByNumber = (num: number): Card | undefined =>
    allCards.find(c => c.number === num);

export const getCardsByLevel = (level: string): Card[] =>
    allCards.filter(c => c.level === level);

export const getCardsByTag = (tag: string): Card[] =>
    allCards.filter(c => c.tags.includes(tag));

export const getCardsByCompany = (company: string): Card[] =>
    allCards.filter(c => c.companyTags.includes(company));

export const getCardsByFrequency = (freq: string): Card[] =>
    allCards.filter(c => c.frequency === freq);

export const getAllTags = (): string[] => {
    const tags = new Set<string>();
    allCards.forEach(c => c.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
};

export const getAllCompanies = (): string[] => {
    const companies = new Set<string>();
    allCards.forEach(c => c.companyTags.forEach(co => companies.add(co)));
    return Array.from(companies).sort();
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
        c.tags.some(t => t.toLowerCase().includes(q)) ||
        c.companyTags.some(co => co.toLowerCase().includes(q))
    );
};

// Default export for backwards compat
export default allCards;
