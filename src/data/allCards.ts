/**
 * allCards.ts — Aggregates all 150 cards from cards.ts + cards_extra1..10
 * Provides the same utility functions as cards.ts but for all 150 cards.
 */

import type { Card } from '@/types/card';
import { cards } from './cards';

export const allCards: Card[] = cards;

// ─── Utility Functions ───────────────────────────────────────────────────────

export const getCardById = (id: string): Card | undefined =>
    allCards.find(c => c.id === id);

export const getCardByNumber = (num: number): Card | undefined =>
    allCards.find(c => c.number === num);

export const getCardsByLevel = (level: string): Card[] =>
    allCards.filter(c => c.level === level);

export const getCardsByTag = (tag: string): Card[] =>
    allCards.filter(c => c.tags && Array.isArray(c.tags) && c.tags.includes(tag));

export const getCardsByCompany = (company: string): Card[] =>
    allCards.filter(c => c.companyTags && Array.isArray(c.companyTags) && c.companyTags.includes(company));

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

export const getAllCompanies = (): string[] => {
    const companies = new Set<string>();
    allCards.forEach(c => {
        if (c.companyTags && Array.isArray(c.companyTags)) {
            c.companyTags.forEach(co => companies.add(co));
        }
    });
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
        (c.tags && Array.isArray(c.tags) && c.tags.some(t => t.toLowerCase().includes(q))) ||
        (c.companyTags && Array.isArray(c.companyTags) && c.companyTags.some(co => co.toLowerCase().includes(q)))
    );
};

// Default export for backwards compat
export default allCards;
