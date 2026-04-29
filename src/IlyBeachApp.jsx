import React, { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ILY BEACH — App de commande mobile-first
// ─────────────────────────────────────────────────────────────────────────────

const CONFIG = {
  TABLE_NUMBER: 5,
  VENUE_NAME: "ILY BEACH",
};

const COLORS = {
  bg: "#080808",
  surface: "#111111",
  surfaceAlt: "#1a1a1a",
  gold: "#C9A84C",
  goldLight: "#E5C76B",
  goldDark: "#8B6914",
  text: "#F0E6D3",
  textDim: "#777",
};

// ─────────────────────────────────────────────────────────────────────────────
// SVG PRODUITS — illustrations luxe sur fond sombre
// ─────────────────────────────────────────────────────────────────────────────

// Chicha générique paramétrable (vase coloré, accents dorés)
const Chicha = ({ vase = "#1a1a1a", liquid = "#0a0a0a", accent = "#C9A84C" }) => (
  <svg viewBox="0 0 80 110" width="68" height="94">
    <defs>
      <linearGradient id={`v-${vase}`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor={vase} stopOpacity="0.7" />
        <stop offset="0.5" stopColor={vase} />
        <stop offset="1" stopColor={vase} stopOpacity="0.6" />
      </linearGradient>
      <linearGradient id={`g-${accent}`} x1="0" x2="1">
        <stop offset="0" stopColor={accent} stopOpacity="0.7" />
        <stop offset="0.5" stopColor="#E5C76B" />
        <stop offset="1" stopColor="#8B6914" />
      </linearGradient>
    </defs>
    {/* Charbon */}
    <ellipse cx="40" cy="5" rx="7" ry="1.5" fill="#1a0a05" />
    <circle cx="37" cy="4" r="0.8" fill="#ff6a00" opacity="0.85" />
    <circle cx="42" cy="5" r="0.7" fill="#ff8800" opacity="0.7" />
    {/* Foyer (clay) */}
    <ellipse cx="40" cy="9" rx="9" ry="2" fill="#2a1810" />
    <path d="M31 9 L33 17 L47 17 L49 9 Z" fill="#3a2818" />
    <ellipse cx="40" cy="17" rx="7" ry="1.5" fill="#1a0a05" />
    {/* Stem */}
    <rect x="37" y="17" width="6" height="28" fill={`url(#g-${accent})`} />
    <rect x="36" y="17" width="8" height="2" fill="#E5C76B" />
    <rect x="35" y="29" width="10" height="3" fill="#E5C76B" rx="1" />
    <rect x="36" y="43" width="8" height="2" fill="#8B6914" />
    {/* Vase */}
    <path d="M30 45 Q40 41 50 45 L54 56 Q40 62 26 56 Z" fill={`url(#v-${vase})`} />
    <path d="M26 56 Q40 63 54 56 L52 90 Q40 96 28 90 Z" fill={`url(#v-${vase})`} />
    {/* Liquide */}
    <path d="M30 72 Q40 76 50 72 L49 88 Q40 92 31 88 Z" fill={liquid} opacity="0.85" />
    {/* Reflet */}
    <path d="M30 50 Q32 65 31 85" stroke="rgba(255,255,255,0.18)" strokeWidth="2" fill="none" />
    {/* Base dorée */}
    <ellipse cx="40" cy="95" rx="15" ry="3" fill={accent} />
    <ellipse cx="40" cy="93" rx="15" ry="1.5" fill="#E5C76B" />
    {/* Tuyau */}
    <rect x="52" y="60" width="6" height="3" fill={accent} rx="1" />
    <path d="M58 62 Q72 68 73 84 Q72 100 62 100" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M58 62 Q72 68 73 84 Q72 100 62 100" stroke={accent} strokeWidth="0.6" fill="none" strokeLinecap="round" strokeDasharray="2 4" />
    <rect x="60" y="98" width="6" height="4" fill={accent} rx="1" />
  </svg>
);

// Bouteille avec label (Coca, Bio, Sims, Schweppes…)
const Bottle = ({ color = "#8B0000", labelColor = "#fff", labelText = "", capColor = "#1a1a1a" }) => (
  <svg viewBox="0 0 40 100" width="40" height="92">
    <defs>
      <linearGradient id={`bot-${color}-${labelText}`} x1="0" x2="1">
        <stop offset="0" stopColor={color} stopOpacity="0.7" />
        <stop offset="0.4" stopColor={color} />
        <stop offset="1" stopColor={color} stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* Capsule */}
    <rect x="14" y="2" width="12" height="6" fill={capColor} rx="1" />
    <rect x="14" y="3" width="12" height="1" fill="rgba(255,255,255,0.3)" />
    {/* Goulot */}
    <rect x="15" y="8" width="10" height="9" fill={`url(#bot-${color}-${labelText})`} />
    {/* Épaule */}
    <path d="M15 17 L9 27 L31 27 L25 17 Z" fill={`url(#bot-${color}-${labelText})`} />
    {/* Corps */}
    <path d="M9 27 L8 85 L32 85 L31 27 Z" fill={`url(#bot-${color}-${labelText})`} />
    {/* Bottom */}
    <ellipse cx="20" cy="86" rx="12" ry="2.5" fill={color} />
    {/* Reflet */}
    <rect x="10" y="30" width="2" height="50" fill="rgba(255,255,255,0.3)" />
    {/* Étiquette */}
    <rect x="8" y="45" width="24" height="22" fill={labelColor} rx="1" />
    <rect x="8" y="45" width="24" height="3" fill="rgba(0,0,0,0.15)" />
    <text x="20" y="59" fontSize="6.5" fill={color} textAnchor="middle" fontWeight="900" fontFamily="serif">
      {labelText}
    </text>
  </svg>
);

// Bouteille d'eau (transparente)
const WaterBottle = () => (
  <svg viewBox="0 0 40 100" width="40" height="92">
    <defs>
      <linearGradient id="water-grad" x1="0" x2="1">
        <stop offset="0" stopColor="#a8d8ff" stopOpacity="0.4" />
        <stop offset="0.5" stopColor="#cce8ff" stopOpacity="0.7" />
        <stop offset="1" stopColor="#88c0e8" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    <rect x="14" y="2" width="12" height="6" fill="#1a4a8a" rx="1" />
    <rect x="15" y="8" width="10" height="9" fill="url(#water-grad)" />
    <path d="M15 17 L9 27 L31 27 L25 17 Z" fill="url(#water-grad)" />
    <path d="M9 27 L8 85 L32 85 L31 27 Z" fill="url(#water-grad)" />
    <ellipse cx="20" cy="86" rx="12" ry="2.5" fill="#88c0e8" opacity="0.5" />
    <rect x="10" y="30" width="2" height="50" fill="rgba(255,255,255,0.6)" />
    <rect x="8" y="48" width="24" height="18" fill="#fff" rx="1" />
    <rect x="8" y="48" width="24" height="6" fill="#0066b8" />
    <text x="20" y="53" fontSize="4" fill="#fff" textAnchor="middle" fontWeight="bold">SIDI</text>
    <text x="20" y="62" fontSize="6" fill="#0066b8" textAnchor="middle" fontWeight="900" fontFamily="serif">EAU</text>
  </svg>
);

// Canette (Red Bull, Énergie)
const Can = ({ topColor = "#3a5fff", bottomColor = "#1a3aaa", labelText = "RED BULL", labelColor = "#fff" }) => (
  <svg viewBox="0 0 40 80" width="38" height="80">
    <defs>
      <linearGradient id={`can-${labelText}`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor={topColor} />
        <stop offset="1" stopColor={bottomColor} />
      </linearGradient>
    </defs>
    {/* Top */}
    <ellipse cx="20" cy="4" rx="13" ry="2.5" fill="#888" />
    <ellipse cx="20" cy="3.5" rx="13" ry="2" fill="#bbb" />
    <rect x="7" y="4" width="26" height="3" fill="#999" />
    {/* Corps */}
    <rect x="7" y="7" width="26" height="62" fill={`url(#can-${labelText})`} />
    {/* Bottom */}
    <ellipse cx="20" cy="69" rx="13" ry="2.5" fill={bottomColor} />
    <ellipse cx="20" cy="69.5" rx="13" ry="2" fill="rgba(0,0,0,0.4)" />
    {/* Logo */}
    <text x="20" y="38" fontSize="5.5" fill={labelColor} textAnchor="middle" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.5">
      {labelText}
    </text>
    {/* Reflet */}
    <rect x="9" y="9" width="2" height="58" fill="rgba(255,255,255,0.4)" />
    <rect x="30" y="9" width="1" height="58" fill="rgba(255,255,255,0.2)" />
  </svg>
);

// Tasse à café
const CoffeeCup = () => (
  <svg viewBox="0 0 80 70" width="68" height="60">
    <defs>
      <linearGradient id="cup-grad" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#3a3a3a" />
        <stop offset="1" stopColor="#1a1a1a" />
      </linearGradient>
    </defs>
    {/* Soucoupe */}
    <ellipse cx="40" cy="60" rx="32" ry="5" fill="#1a1a1a" />
    <ellipse cx="40" cy="59" rx="32" ry="5" fill="none" stroke={COLORS.gold} strokeWidth="0.6" />
    <ellipse cx="40" cy="58" rx="20" ry="2" fill="#0a0a0a" />
    {/* Anse */}
    <path d="M58 30 Q72 35 65 50" stroke={COLORS.gold} strokeWidth="2" fill="none" />
    <path d="M58 32 Q68 36 63 48" stroke="rgba(0,0,0,0.4)" strokeWidth="3" fill="none" />
    {/* Tasse */}
    <path d="M18 22 L22 56 L58 56 L62 22 Z" fill="url(#cup-grad)" stroke={COLORS.gold} strokeWidth="0.8" />
    {/* Café (crema) */}
    <ellipse cx="40" cy="22" rx="22" ry="3" fill="#6b3a1a" />
    <ellipse cx="40" cy="21.5" rx="20" ry="2.5" fill="#8b5a2a" />
    <ellipse cx="40" cy="21" rx="14" ry="1.8" fill="#c89868" />
    {/* Vapeur */}
    <path d="M30 18 Q28 12 32 8 Q34 4 30 0" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
    <path d="M40 18 Q42 12 38 8 Q40 4 42 0" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
    <path d="M50 18 Q52 12 48 8 Q50 4 46 0" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
  </svg>
);

// Verre de thé à la menthe
const TeaGlass = () => (
  <svg viewBox="0 0 60 80" width="56" height="74">
    <defs>
      <linearGradient id="tea-grad" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#5a9a3a" />
        <stop offset="1" stopColor="#2a5a1a" />
      </linearGradient>
    </defs>
    {/* Soucoupe */}
    <ellipse cx="30" cy="73" rx="22" ry="3" fill="#1a1a1a" />
    <ellipse cx="30" cy="72" rx="22" ry="2.8" fill="none" stroke={COLORS.gold} strokeWidth="0.5" />
    {/* Verre */}
    <path d="M14 20 L18 70 L42 70 L46 20 Z" fill="rgba(255,255,255,0.08)" stroke={COLORS.gold} strokeWidth="0.6" />
    {/* Décor doré du verre marocain */}
    <path d="M16 30 Q30 33 44 30" stroke={COLORS.gold} strokeWidth="0.4" fill="none" />
    <path d="M17 50 Q30 53 43 50" stroke={COLORS.gold} strokeWidth="0.4" fill="none" />
    <circle cx="20" cy="40" r="1" fill={COLORS.gold} opacity="0.6" />
    <circle cx="30" cy="42" r="1" fill={COLORS.gold} opacity="0.6" />
    <circle cx="40" cy="40" r="1" fill={COLORS.gold} opacity="0.6" />
    {/* Thé */}
    <path d="M16 25 L19 65 L41 65 L44 25 Z" fill="url(#tea-grad)" opacity="0.85" />
    {/* Feuilles de menthe */}
    <ellipse cx="22" cy="22" rx="3.5" ry="2" fill="#5a9a3a" transform="rotate(-20 22 22)" />
    <ellipse cx="30" cy="20" rx="4" ry="2.2" fill="#6aaa4a" />
    <ellipse cx="38" cy="22" rx="3.5" ry="2" fill="#5a9a3a" transform="rotate(20 38 22)" />
    {/* Vapeur */}
    <path d="M25 18 Q23 10 27 4" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
    <path d="M35 18 Q37 10 33 4" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
  </svg>
);

// Théière marocaine dorée
const Teapot = () => (
  <svg viewBox="0 0 100 80" width="80" height="64">
    <defs>
      <radialGradient id="pot-grad" cx="0.5" cy="0.4">
        <stop offset="0" stopColor="#E5C76B" />
        <stop offset="0.7" stopColor="#C9A84C" />
        <stop offset="1" stopColor="#8B6914" />
      </radialGradient>
    </defs>
    {/* Anse */}
    <path d="M22 35 Q5 40 20 60" stroke="url(#pot-grad)" strokeWidth="3.5" fill="none" />
    <path d="M22 35 Q8 40 20 60" stroke="#8B6914" strokeWidth="1" fill="none" opacity="0.6" />
    {/* Bec verseur */}
    <path d="M75 45 L92 38 L88 52 L72 50 Z" fill="url(#pot-grad)" />
    <path d="M75 45 L92 38 L88 52 L72 50 Z" fill="none" stroke="#8B6914" strokeWidth="0.5" />
    {/* Corps */}
    <ellipse cx="50" cy="50" rx="28" ry="22" fill="url(#pot-grad)" />
    <ellipse cx="50" cy="50" rx="28" ry="22" fill="none" stroke="#8B6914" strokeWidth="0.6" />
    {/* Décorations gravées */}
    <ellipse cx="50" cy="50" rx="20" ry="15" fill="none" stroke="#8B6914" strokeWidth="0.4" opacity="0.8" />
    <path d="M40 50 L50 42 L60 50 L50 58 Z" fill="none" stroke="#8B6914" strokeWidth="0.5" />
    <circle cx="50" cy="50" r="2" fill="#8B6914" />
    <path d="M30 50 Q35 47 40 50 M60 50 Q65 47 70 50" stroke="#8B6914" strokeWidth="0.4" fill="none" />
    {/* Couvercle */}
    <ellipse cx="50" cy="30" rx="14" ry="3" fill="#8B6914" />
    <path d="M37 30 Q50 22 63 30 Z" fill="url(#pot-grad)" />
    <path d="M37 30 Q50 22 63 30 Z" fill="none" stroke="#8B6914" strokeWidth="0.5" />
    {/* Pommeau */}
    <circle cx="50" cy="20" r="3.5" fill="url(#pot-grad)" stroke="#8B6914" strokeWidth="0.5" />
    <circle cx="50" cy="20" r="1.5" fill="#E5C76B" />
  </svg>
);

// Cocktail (verre tulipe avec gradient)
const Cocktail = ({ topColor = "#ffaa00", bottomColor = "#ff3a3a", garnishColor = "#5a9a3a" }) => (
  <svg viewBox="0 0 60 100" width="54" height="90">
    <defs>
      <linearGradient id={`cock-${topColor}-${bottomColor}`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor={topColor} />
        <stop offset="1" stopColor={bottomColor} />
      </linearGradient>
    </defs>
    {/* Garniture */}
    <ellipse cx="38" cy="22" rx="3" ry="1.8" fill={garnishColor} />
    <ellipse cx="42" cy="20" rx="2.5" ry="1.5" fill={garnishColor} opacity="0.8" />
    <circle cx="22" cy="22" r="2.5" fill="#ffd700" />
    <path d="M22 22 L20 24 L24 24 Z" fill="#fff" />
    {/* Paille */}
    <rect x="36" y="14" width="1.5" height="22" fill={COLORS.gold} />
    <rect x="36" y="14" width="1.5" height="3" fill="#fff" opacity="0.5" />
    {/* Verre */}
    <path d="M12 25 L20 70 L40 70 L48 25 Z" fill="rgba(255,255,255,0.1)" stroke={COLORS.gold} strokeWidth="0.5" />
    {/* Liquide */}
    <path d="M14 28 L21 67 L39 67 L46 28 Z" fill={`url(#cock-${topColor}-${bottomColor})`} />
    {/* Bulles */}
    <circle cx="25" cy="50" r="1" fill="rgba(255,255,255,0.5)" />
    <circle cx="32" cy="55" r="0.8" fill="rgba(255,255,255,0.4)" />
    <circle cx="28" cy="60" r="0.6" fill="rgba(255,255,255,0.3)" />
    {/* Pied */}
    <rect x="29" y="70" width="2" height="18" fill="rgba(255,255,255,0.2)" stroke={COLORS.goldDark} strokeWidth="0.3" />
    {/* Base */}
    <ellipse cx="30" cy="89" rx="13" ry="2.5" fill="#1a1a1a" />
    <ellipse cx="30" cy="88.5" rx="13" ry="2.2" fill="none" stroke={COLORS.gold} strokeWidth="0.4" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// IMAGES PRODUITS
// → photos dans /public/images/{id}.png (ex: chicha_reglisse.png, redbull.png…)
// → si une image manque (ex: eau, limonade), le SVG fallback prend le relais
// ─────────────────────────────────────────────────────────────────────────────
const IMAGE_BASE = "/images";

const ProductVisual = ({ id, fallback }) => {
  const [imgError, setImgError] = useState(false);
  if (imgError) return fallback;
  return (
    <img
      src={`${IMAGE_BASE}/${id}.png`}
      alt={id}
      onError={() => setImgError(true)}
      className="w-full h-full object-contain"
      style={{ maxWidth: "100%", maxHeight: "100%" }}
    />
  );
};

// Fallbacks SVG si pas de photo disponible
const VISUALS = {
  chicha_reglisse: { fallback: <Chicha vase="#0a0a0a" liquid="#000" accent="#C9A84C" />, deco: "🍂" },
  chicha_love:     { fallback: <Chicha vase="#7a1a2a" liquid="#3a0a15" accent="#C9A84C" />, deco: "🍓" },
  chicha_hawoienne:{ fallback: <Chicha vase="#1a4a6a" liquid="#0a2a4a" accent="#C9A84C" />, deco: "🍍" },
  chicha_mi_amor:  { fallback: <Chicha vase="#a02030" liquid="#5a0a15" accent="#C9A84C" />, deco: "🍎" },
  chicha_menthe:        { fallback: <Chicha vase="#2a6a4a" liquid="#0f3a25" accent="#C9A84C" />, deco: "🌿" },
  chicha_menthe_mastic: { fallback: <Chicha vase="#1a4a3a" liquid="#0a2a1a" accent="#C9A84C" />, deco: "🌿" },
  chicha_pomme:         { fallback: <Chicha vase="#3a7a2a" liquid="#1a4a15" accent="#C9A84C" />, deco: "🍏" },
  chicha_blueberry:     { fallback: <Chicha vase="#2a3a7a" liquid="#1a2050" accent="#C9A84C" />, deco: "🫐" },
  chicha_aeske:         { fallback: <Chicha vase="#6a4a1a" liquid="#3a2a0a" accent="#E5C76B" />, deco: "✨" },
  chicha_fruits:        { fallback: <Chicha vase="#5a2a4a" liquid="#3a1a2a" accent="#C9A84C" />, deco: "🍇" },
  eau:       { fallback: <WaterBottle />, deco: "" },
  cafe:      { fallback: <CoffeeCup />, deco: "" },
  the_vert:  { fallback: <TeaGlass />, deco: "" },
  the_menthe:{ fallback: <TeaGlass />, deco: "" },
  theiere:   { fallback: <Teapot />, deco: "" },
  limonade:  { fallback: <Bottle color="#c8102e" labelColor="#fff" labelText="COCA" capColor="#9a0a20" />, deco: "" },
  bio:       { fallback: <Bottle color="#f4c430" labelColor="#fff" labelText="BIO" capColor="#aa8a10" />, deco: "" },
  sims:      { fallback: <Bottle color="#f08020" labelColor="#fff" labelText="SIMS" capColor="#a05010" />, deco: "" },
  schweppes: { fallback: <Bottle color="#e8c038" labelColor="#1a4a8a" labelText="SCHWEPPES" capColor="#aa8a20" />, deco: "" },
  wulmes:    { fallback: <WaterBottle />, deco: "" },
  energie:   { fallback: <Can topColor="#5a5a5a" bottomColor="#2a2a2a" labelText="ÉNERGIE" labelColor="#C9A84C" />, deco: "" },
  redbull:   { fallback: <Can topColor="#3a5fff" bottomColor="#0a2a8a" labelText="RED BULL" labelColor="#fff" />, deco: "" },
  mojito_royal:   { fallback: <Cocktail topColor="#a8e8a8" bottomColor="#5aaa5a" garnishColor="#3a8a3a" />, deco: "" },
  coucher_soleil: { fallback: <Cocktail topColor="#ffd040" bottomColor="#ff3a3a" garnishColor="#ff8a3a" />, deco: "" },
  plaisir_ete:    { fallback: <Cocktail topColor="#ffd8c0" bottomColor="#ffa090" garnishColor="#5a9a3a" />, deco: "" },
};

// ─────────────────────────────────────────────────────────────────────────────
// MENU
// ─────────────────────────────────────────────────────────────────────────────
// Helper pour rendre le menu plus lisible : on définit les noms par langue
// Pour chaque produit, names contient les 10 langues hardcodées
const MENU = {
  CHICHAS: [
    {
      id: "chicha_reglisse", price: 120,
      names: { fr: "Chicha Réglisse", ar: "شيشة عرق السوس", en: "Liquorice Hookah", es: "Cachimba de Regaliz", it: "Narghilè alla Liquirizia", de: "Lakritz-Shisha", pt: "Shisha de Alcaçuz", nl: "Drop-Waterpijp", ru: "Кальян со вкусом лакрицы", zh: "甘草水烟" },
    },
    {
      id: "chicha_love", price: 100,
      names: { fr: "Chicha Love", ar: "شيشة لوف", en: "Love Hookah", es: "Cachimba Love", it: "Narghilè Love", de: "Love-Shisha", pt: "Shisha Love", nl: "Love-waterpijp", ru: "Кальян Love", zh: "爱情水烟" },
    },
    {
      id: "chicha_hawoienne", price: 100,
      names: { fr: "Chicha Hawoïenne", ar: "شيشة هاواي", en: "Hawaiian Hookah", es: "Cachimba Hawaiana", it: "Narghilè Hawaiano", de: "Hawaii-Shisha", pt: "Shisha Havaiana", nl: "Hawaïaanse Waterpijp", ru: "Гавайский кальян", zh: "夏威夷水烟" },
    },
    {
      id: "chicha_mi_amor", price: 100,
      names: { fr: "Chicha Mi Amor", ar: "شيشة مي أمور", en: "Mi Amor Hookah", es: "Cachimba Mi Amor", it: "Narghilè Mi Amor", de: "Mi-Amor-Shisha", pt: "Shisha Mi Amor", nl: "Mi-Amor-waterpijp", ru: "Кальян Mi Amor", zh: "Mi Amor 水烟" },
    },
    {
      id: "chicha_fruits", price: 100,
      names: { fr: "Chicha Fruits", ar: "شيشة فواكه", en: "Fruits Hookah", es: "Cachimba de Frutas", it: "Narghilè alla Frutta", de: "Frucht-Shisha", pt: "Shisha de Frutas", nl: "Fruit-waterpijp", ru: "Фруктовый кальян", zh: "水果水烟" },
    },
    {
      id: "chicha_blueberry", price: 120,
      names: { fr: "Chicha Myrtille", ar: "شيشة توت أزرق", en: "Blueberry Hookah", es: "Cachimba de Arándano", it: "Narghilè al Mirtillo", de: "Blaubeer-Shisha", pt: "Shisha de Mirtilo", nl: "Blauwe-bes-waterpijp", ru: "Черничный кальян", zh: "蓝莓水烟" },
    },
    {
      id: "chicha_menthe", price: 70,
      names: { fr: "Chicha Menthe", ar: "شيشة نعناع", en: "Mint Hookah", es: "Cachimba de Menta", it: "Narghilè alla Menta", de: "Minz-Shisha", pt: "Shisha de Menta", nl: "Munt-waterpijp", ru: "Мятный кальян", zh: "薄荷水烟" },
    },
    {
      id: "chicha_menthe_mastic", price: 70,
      names: { fr: "Chicha Menthe Mastic", ar: "شيشة نعناع مستيك", en: "Mint Mastic Hookah", es: "Cachimba de Menta y Almáciga", it: "Narghilè alla Menta e Mastice", de: "Minz-Mastix-Shisha", pt: "Shisha de Menta e Aroeira", nl: "Munt-Mastiek-waterpijp", ru: "Мятный кальян с мастикой", zh: "薄荷乳香水烟" },
    },
    {
      id: "chicha_pomme", price: 70,
      names: { fr: "Chicha Pomme", ar: "شيشة تفاح", en: "Apple Hookah", es: "Cachimba de Manzana", it: "Narghilè alla Mela", de: "Apfel-Shisha", pt: "Shisha de Maçã", nl: "Appel-waterpijp", ru: "Яблочный кальян", zh: "苹果水烟" },
    },
    {
      id: "chicha_aeske", price: 70,
      names: { fr: "Chicha Arabe", ar: "شيشة عربية", en: "Arabic Hookah", es: "Cachimba Árabe", it: "Narghilè Arabo", de: "Arabische Shisha", pt: "Shisha Árabe", nl: "Arabische Waterpijp", ru: "Арабский кальян", zh: "阿拉伯水烟" },
    },
  ],
  BOISSONS: [
    {
      id: "eau", price: 20,
      names: { fr: "Eau", ar: "ماء", en: "Water", es: "Agua", it: "Acqua", de: "Wasser", pt: "Água", nl: "Water", ru: "Вода", zh: "水" },
    },
    {
      id: "cafe", price: 20,
      names: { fr: "Café", ar: "قهوة", en: "Coffee", es: "Café", it: "Caffè", de: "Kaffee", pt: "Café", nl: "Koffie", ru: "Кофе", zh: "咖啡" },
    },
    {
      id: "the_vert", price: 20,
      names: { fr: "Thé vert", ar: "شاي أخضر", en: "Green Tea", es: "Té verde", it: "Tè verde", de: "Grüner Tee", pt: "Chá verde", nl: "Groene thee", ru: "Зелёный чай", zh: "绿茶" },
    },
    {
      id: "the_menthe", price: 20,
      names: { fr: "Thé menthe", ar: "شاي بالنعناع", en: "Mint Tea", es: "Té con menta", it: "Tè alla menta", de: "Minztee", pt: "Chá de menta", nl: "Muntthee", ru: "Чай с мятой", zh: "薄荷茶" },
    },
    {
      id: "theiere", price: 25,
      names: { fr: "Théière", ar: "براد شاي بالنعناع", en: "Mint Tea Pot", es: "Tetera de menta", it: "Teiera alla menta", de: "Minztee-Kanne", pt: "Bule de chá de menta", nl: "Muntthee-pot", ru: "Чайник мятного чая", zh: "薄荷茶壶" },
    },
    {
      id: "limonade", price: 30,
      names: { fr: "Limonade soda", ar: "ليموناضة", en: "Soda Lemonade", es: "Limonada con gas", it: "Limonata gassata", de: "Limonade", pt: "Limonada gaseificada", nl: "Bruislimonade", ru: "Лимонад", zh: "苏打柠檬汁" },
    },
    {
      id: "bio", price: 30,
      names: { fr: "Bio (jus)", ar: "عصير بيو", en: "Bio juice", es: "Zumo Bio", it: "Succo Bio", de: "Bio-Saft", pt: "Sumo Bio", nl: "Bio-sap", ru: "Сок Bio", zh: "Bio 果汁" },
    },
    {
      id: "sims", price: 30,
      names: { fr: "Simens (jus)", ar: "عصير سيمو", en: "Simens juice", es: "Zumo Simens", it: "Succo Simens", de: "Simens-Saft", pt: "Sumo Simens", nl: "Simens-sap", ru: "Сок Simens", zh: "Simens 果汁" },
    },
    {
      id: "schweppes", price: 30,
      names: { fr: "Schweppes", ar: "شويبس", en: "Schweppes", es: "Schweppes", it: "Schweppes", de: "Schweppes", pt: "Schweppes", nl: "Schweppes", ru: "Швепс", zh: "怡泉 Schweppes" },
    },
    {
      id: "wulmes", price: 30,
      names: { fr: "Wulmes", ar: "والماس", en: "Wulmes", es: "Wulmes", it: "Wulmes", de: "Wulmes", pt: "Wulmes", nl: "Wulmes", ru: "Wulmes", zh: "Wulmes" },
    },
    {
      id: "energie", price: 45,
      names: { fr: "Énergie", ar: "مشروب طاقة", en: "Energy Drink", es: "Bebida energética", it: "Energy Drink", de: "Energy-Drink", pt: "Bebida energética", nl: "Energiedrank", ru: "Энергетик", zh: "能量饮料" },
    },
    {
      id: "redbull", price: 50,
      names: { fr: "Red Bull", ar: "ريد بول", en: "Red Bull", es: "Red Bull", it: "Red Bull", de: "Red Bull", pt: "Red Bull", nl: "Red Bull", ru: "Red Bull", zh: "红牛 Red Bull" },
    },
  ],
  COCKTAILS: [
    {
      id: "mojito_royal", price: 35,
      names: { fr: "Mojito Royal", ar: "موهيتو رويال", en: "Royal Mojito", es: "Mojito Real", it: "Mojito Reale", de: "Royal Mojito", pt: "Mojito Real", nl: "Royal Mojito", ru: "Роял Мохито", zh: "皇家莫吉托" },
      descs: { fr: "Menthe, citron, eau gazeuse", ar: "نعناع، ليمون، ماء غازي", en: "Mint, lemon, sparkling water", es: "Menta, limón, agua con gas", it: "Menta, limone, acqua frizzante", de: "Minze, Zitrone, Sprudelwasser", pt: "Menta, limão, água com gás", nl: "Munt, citroen, bruiswater", ru: "Мята, лимон, газированная вода", zh: "薄荷、柠檬、苏打水" },
    },
    {
      id: "coucher_soleil", price: 35,
      names: { fr: "Coucher de Soleil", ar: "غروب الشمس", en: "Sunset", es: "Atardecer", it: "Tramonto", de: "Sonnenuntergang", pt: "Pôr do Sol", nl: "Zonsondergang", ru: "Закат", zh: "日落" },
      descs: { fr: "Jus d'orange, grenade, soda", ar: "عصير برتقال، رمان، صودا", en: "Orange juice, pomegranate, soda", es: "Zumo de naranja, granada, soda", it: "Succo d'arancia, melograno, soda", de: "Orangensaft, Granatapfel, Soda", pt: "Sumo de laranja, romã, soda", nl: "Sinaasappelsap, granaatappel, soda", ru: "Апельсиновый сок, гранат, содовая", zh: "橙汁、石榴、苏打水" },
    },
    {
      id: "plaisir_ete", price: 35,
      names: { fr: "Plaisir d'Été", ar: "متعة الصيف", en: "Summer Pleasure", es: "Placer de Verano", it: "Piacere d'Estate", de: "Sommervergnügen", pt: "Prazer de Verão", nl: "Zomers Genot", ru: "Летнее наслаждение", zh: "夏日之乐" },
      descs: { fr: "Pêche, ananas, crème, glace", ar: "خوخ، أناناس، كريمة، مثلجات", en: "Peach, pineapple, cream, ice cream", es: "Melocotón, piña, crema, helado", it: "Pesca, ananas, panna, gelato", de: "Pfirsich, Ananas, Sahne, Eis", pt: "Pêssego, ananás, natas, gelado", nl: "Perzik, ananas, room, ijs", ru: "Персик, ананас, сливки, мороженое", zh: "桃子、菠萝、奶油、冰淇淋" },
    },
  ],
};

const MENU_BY_ID = Object.values(MENU).flat().reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});

// ─────────────────────────────────────────────────────────────────────────────
// I18N — traductions UI
// ─────────────────────────────────────────────────────────────────────────────
const I18N = {
  fr: {
    welcome_title: "Bienvenue",
    welcome_sub: "Choisissez votre langue",
    other_label: "Autre langue",
    other_ph: "Ex : Español, Italiano, Deutsch...",
    continue: "Continuer",
    table: "TABLE",
    sublogo: "SHISHA LOUNGE · MARRAKECH",
    sec_chichas: "CHICHAS",
    sec_boissons: "BOISSONS",
    sec_cocktails: "COCKTAILS SANS ALCOOL",
    cart: "VOTRE PANIER",
    total: "TOTAL",
    clear: "VIDER",
    send: "ENVOYER",
    cart_empty: "Votre panier est vide",
    cart_empty_sub: "Découvrez notre carte ou demandez à l'assistant",
    cart_via: "La commande sera transmise au serveur via WhatsApp",
    chat_title: "Assistant ILY",
    chat_sub: "Posez-moi vos questions sur la carte",
    chat_ph: "Posez une question sur la carte…",
    chat_welcome: "Bienvenue chez ILY BEACH ✨ Je suis votre assistant. N'hésitez pas à me poser des questions sur notre carte ou à me demander des conseils !",
    confirm: () => "",
    err: "Désolé, une erreur s'est produite. Découvrez la carte juste au-dessus en attendant. 🙏",
    footer: "Merci de votre visite — bonne dégustation",
  },
  ar: {
    welcome_title: "مرحبا بكم",
    welcome_sub: "اختار اللغة ديالك",
    other_label: "لغة أخرى",
    other_ph: "مثلا: Español, Italiano...",
    continue: "متابعة",
    table: "طاولة",
    sublogo: "شيشا لاونج · مراكش",
    sec_chichas: "الشيشة",
    sec_boissons: "المشروبات",
    sec_cocktails: "كوكتيلات بلا كحول",
    cart: "السلة ديالك",
    total: "المجموع",
    clear: "مسح",
    send: "إرسال",
    cart_empty: "السلة ديالك خاوية",
    cart_empty_sub: "شوف الكارت ولا سول المساعد",
    cart_via: "الطلب غادي يمشي للنادل عبر واتساب",
    chat_title: "مساعد إيلي",
    chat_sub: "سولني على الكارت",
    chat_ph: "سول سؤال على الكارت...",
    chat_welcome: "مرحبا بكم في إيلي بيتش ✨ أنا المساعد ديالكم. سولوني على الكارت ولا طلبو مني نصيحة!",
    confirm: () => "",
    err: "سمح ليا، كاين مشكل. شوف الكارت اللي فوق. 🙏",
    footer: "شكرا على الزيارة — استمتع",
  },
  en: {
    welcome_title: "Welcome",
    welcome_sub: "Choose your language",
    other_label: "Other language",
    other_ph: "E.g. Español, Italiano, Deutsch...",
    continue: "Continue",
    table: "TABLE",
    sublogo: "SHISHA LOUNGE · MARRAKECH",
    sec_chichas: "HOOKAHS",
    sec_boissons: "DRINKS",
    sec_cocktails: "MOCKTAILS",
    cart: "YOUR CART",
    total: "TOTAL",
    clear: "CLEAR",
    send: "SEND",
    cart_empty: "Your cart is empty",
    cart_empty_sub: "Browse the menu or ask the assistant",
    cart_via: "The order will be sent to the waiter via WhatsApp",
    chat_title: "ILY Assistant",
    chat_sub: "Ask me about the menu",
    chat_ph: "Ask a question about the menu…",
    chat_welcome: "Welcome to ILY BEACH ✨ I'm your assistant. Feel free to ask me anything about our menu or get a recommendation!",
    confirm: () => "",
    err: "Sorry, an error occurred. Browse the menu above in the meantime. 🙏",
    footer: "Thank you for your visit — enjoy",
  },
  es: {
    welcome_title: "Bienvenidos",
    welcome_sub: "Elija su idioma",
    other_label: "Otro idioma",
    other_ph: "Ej.: Italiano, Deutsch...",
    continue: "Continuar",
    table: "MESA",
    sublogo: "SHISHA LOUNGE · MARRAKECH",
    sec_chichas: "SHISHAS",
    sec_boissons: "BEBIDAS",
    sec_cocktails: "CÓCTELES SIN ALCOHOL",
    chat_title: "Asistente ILY",
    chat_sub: "Pregúnteme sobre la carta",
    chat_ph: "Haga una pregunta sobre la carta…",
    chat_welcome: "Bienvenido a ILY BEACH ✨ Soy su asistente. ¡No dude en preguntarme cualquier cosa sobre nuestra carta o pedir una recomendación!",
    confirm: () => "",
    err: "Lo sentimos, ha ocurrido un error. Mientras tanto, consulte la carta arriba. 🙏",
    footer: "Gracias por su visita — disfrute",
  },
  it: {
    welcome_title: "Benvenuti",
    welcome_sub: "Scegli la tua lingua",
    other_label: "Altra lingua",
    other_ph: "Es.: Español, Deutsch...",
    continue: "Continua",
    table: "TAVOLO",
    sublogo: "SHISHA LOUNGE · MARRAKECH",
    sec_chichas: "NARGHILÈ",
    sec_boissons: "BEVANDE",
    sec_cocktails: "MOCKTAIL",
    chat_title: "Assistente ILY",
    chat_sub: "Chiedimi del menu",
    chat_ph: "Fai una domanda sul menu…",
    chat_welcome: "Benvenuti all'ILY BEACH ✨ Sono il vostro assistente. Non esitate a chiedermi qualsiasi cosa sul nostro menu o un consiglio!",
    confirm: () => "",
    err: "Spiacente, si è verificato un errore. Sfoglia il menu sopra nel frattempo. 🙏",
    footer: "Grazie della visita — buona degustazione",
  },
  de: {
    welcome_title: "Willkommen",
    welcome_sub: "Wählen Sie Ihre Sprache",
    other_label: "Andere Sprache",
    other_ph: "z.B. Italiano, Español...",
    continue: "Weiter",
    table: "TISCH",
    sublogo: "SHISHA LOUNGE · MARRAKESCH",
    sec_chichas: "SHISHAS",
    sec_boissons: "GETRÄNKE",
    sec_cocktails: "ALKOHOLFREIE COCKTAILS",
    chat_title: "ILY-Assistent",
    chat_sub: "Fragen Sie mich zur Karte",
    chat_ph: "Stellen Sie eine Frage zur Karte…",
    chat_welcome: "Willkommen im ILY BEACH ✨ Ich bin Ihr Assistent. Fragen Sie mich gerne alles über unsere Karte oder lassen Sie sich beraten!",
    confirm: () => "",
    err: "Entschuldigung, ein Fehler ist aufgetreten. Schauen Sie sich in der Zwischenzeit die Karte oben an. 🙏",
    footer: "Vielen Dank für Ihren Besuch — genießen Sie es",
  },
  pt: {
    welcome_title: "Bem-vindos",
    welcome_sub: "Escolha o seu idioma",
    other_label: "Outro idioma",
    other_ph: "Ex.: Italiano, Deutsch...",
    continue: "Continuar",
    table: "MESA",
    sublogo: "SHISHA LOUNGE · MARRAQUEXE",
    sec_chichas: "SHISHAS",
    sec_boissons: "BEBIDAS",
    sec_cocktails: "MOCKTAILS",
    chat_title: "Assistente ILY",
    chat_sub: "Pergunte-me sobre o menu",
    chat_ph: "Faça uma pergunta sobre o menu…",
    chat_welcome: "Bem-vindo ao ILY BEACH ✨ Sou o seu assistente. Sinta-se à vontade para me perguntar qualquer coisa sobre o nosso menu ou pedir uma recomendação!",
    confirm: () => "",
    err: "Desculpe, ocorreu um erro. Consulte o menu acima entretanto. 🙏",
    footer: "Obrigado pela sua visita — aproveite",
  },
  nl: {
    welcome_title: "Welkom",
    welcome_sub: "Kies uw taal",
    other_label: "Andere taal",
    other_ph: "Bijv. Italiano, Deutsch...",
    continue: "Doorgaan",
    table: "TAFEL",
    sublogo: "SHISHA LOUNGE · MARRAKECH",
    sec_chichas: "WATERPIJPEN",
    sec_boissons: "DRANKEN",
    sec_cocktails: "ALCOHOLVRIJE COCKTAILS",
    chat_title: "ILY-assistent",
    chat_sub: "Stel mij vragen over het menu",
    chat_ph: "Stel een vraag over het menu…",
    chat_welcome: "Welkom bij ILY BEACH ✨ Ik ben uw assistent. Stel mij gerust vragen over ons menu of vraag om een aanbeveling!",
    confirm: () => "",
    err: "Sorry, er is een fout opgetreden. Bekijk in de tussentijd het menu hierboven. 🙏",
    footer: "Bedankt voor uw bezoek — geniet ervan",
  },
  ru: {
    welcome_title: "Добро пожаловать",
    welcome_sub: "Выберите ваш язык",
    other_label: "Другой язык",
    other_ph: "Напр. Italiano, Deutsch...",
    continue: "Продолжить",
    table: "СТОЛ",
    sublogo: "ШИША-ЛАУНДЖ · МАРРАКЕШ",
    sec_chichas: "КАЛЬЯНЫ",
    sec_boissons: "НАПИТКИ",
    sec_cocktails: "БЕЗАЛКОГОЛЬНЫЕ КОКТЕЙЛИ",
    chat_title: "Ассистент ILY",
    chat_sub: "Задайте мне вопрос о меню",
    chat_ph: "Задайте вопрос о меню…",
    chat_welcome: "Добро пожаловать в ILY BEACH ✨ Я ваш ассистент. Задавайте любые вопросы о нашем меню или попросите рекомендацию!",
    confirm: () => "",
    err: "Извините, произошла ошибка. Тем временем посмотрите меню выше. 🙏",
    footer: "Спасибо за визит — приятного отдыха",
  },
  zh: {
    welcome_title: "欢迎光临",
    welcome_sub: "请选择您的语言",
    other_label: "其他语言",
    other_ph: "例如：Italiano, Deutsch...",
    continue: "继续",
    table: "桌号",
    sublogo: "水烟休息室 · 马拉喀什",
    sec_chichas: "水烟",
    sec_boissons: "饮料",
    sec_cocktails: "无酒精鸡尾酒",
    chat_title: "ILY 助手",
    chat_sub: "向我询问菜单",
    chat_ph: "向我询问菜单…",
    chat_welcome: "欢迎来到 ILY BEACH ✨ 我是您的助手。欢迎随时询问菜单或获取推荐！",
    confirm: () => "",
    err: "抱歉，发生错误。请先浏览上方的菜单。🙏",
    footer: "感谢您的光临 — 请享用",
  },
};

// Pour "autre" : on utilise EN pour l'UI et on demande à l'IA de répondre dans la langue choisie
const tr = (lang) => I18N[lang] || I18N.en;

// ─────────────────────────────────────────────────────────────────────────────
// SYSTEM PROMPT IA (avec directive de langue)
// ─────────────────────────────────────────────────────────────────────────────
const buildSystemPrompt = (lang, otherLang) => {
  const langDirective = (() => {
    if (lang === "fr") return "===\nLANGUE OBLIGATOIRE : RÉPONDS UNIQUEMENT EN FRANÇAIS. Aucun autre langue, aucun mot d'anglais.\n===";
    if (lang === "ar") return "===\nاللغة المطلوبة: جاوب فقط بالدارجة المغربية، بحروف عربية. ما تستعملش الفرنسية ولا الإنجليزية.\n===";
    if (lang === "en") return "===\nMANDATORY LANGUAGE: RESPOND ONLY IN ENGLISH. No other language, no French words.\n===";
    if (lang === "es") return "===\nIDIOMA OBLIGATORIO: RESPONDE SOLO EN ESPAÑOL. Ningún otro idioma, ninguna palabra en inglés o francés.\n===";
    if (lang === "it") return "===\nLINGUA OBBLIGATORIA: RISPONDI SOLO IN ITALIANO. Nessun'altra lingua, nessuna parola in inglese o francese.\n===";
    if (lang === "de") return "===\nPFLICHTSPRACHE: ANTWORTE NUR AUF DEUTSCH. Keine andere Sprache, keine englischen oder französischen Wörter.\n===";
    if (lang === "pt") return "===\nIDIOMA OBRIGATÓRIO: RESPONDE APENAS EM PORTUGUÊS. Nenhuma outra língua, nenhuma palavra em inglês ou francês.\n===";
    if (lang === "nl") return "===\nVERPLICHTE TAAL: ANTWOORD ALLEEN IN HET NEDERLANDS. Geen andere taal, geen Engelse of Franse woorden.\n===";
    if (lang === "ru") return "===\nОБЯЗАТЕЛЬНЫЙ ЯЗЫК: ОТВЕЧАЙ ТОЛЬКО НА РУССКОМ ЯЗЫКЕ. Никакого другого языка, никаких английских или французских слов.\n===";
    if (lang === "zh") return "===\n强制语言：只用中文回答。不要使用其他语言，不要使用英文或法文单词。\n===";
    if (lang === "other" && otherLang) {
      return `===
CRITICAL LANGUAGE RULE — READ CAREFULLY
The customer's chosen language is: ${otherLang}
You MUST write EVERY SINGLE WORD of EVERY response in ${otherLang} ONLY.
Do NOT use English. Do NOT use French. ONLY ${otherLang}.

EXCEPTION — Brand and product names from the menu keep their original spelling and are NOT translated:
"Chicha Réglisse", "Chicha Love", "Chicha Hawoïenne", "Chicha Mi Amor", "Chicha Menthe Mastic", "Chicha Aeske", "Chicha Fruits",
"Red Bull", "Schweppes", "Sims", "Bio", "Wulmes", "Mojito Royal", "Coucher de Soleil", "Plaisir d'Été".
Everything else (greetings, prices, descriptions, advice) must be in ${otherLang}.

If you accidentally start writing in English, STOP and rewrite in ${otherLang}.
===`;
    }
    return "";
  })();

  return `Tu es l'assistant du bar/lounge ILY BEACH à Marrakech.

${langDirective}

Sois chaleureux, professionnel et décontracté. Réponses courtes (1 à 3 phrases sauf si le client demande plus de détails).

NOTRE CARTE :

CHICHAS :
- Chicha Réglisse — 120 DH
- Chicha Myrtille (Blueberry) — 120 DH
- Chicha Love — 100 DH (parfum sucré, très populaire en couple)
- Chicha Hawoïenne — 100 DH (ananas, fruits exotiques)
- Chicha Mi Amor — 100 DH (pomme rouge)
- Chicha Fruits — 100 DH (fruits rouges du moment)
- Chicha Menthe — 70 DH (menthe fraîche, simple et rafraîchissante)
- Chicha Menthe Mastic — 70 DH (la classique marocaine, menthe + mastic)
- Chicha Pomme — 70 DH (pomme verte, fraîche et fruitée)
- Chicha Arabe — 70 DH (mélange traditionnel arabe maison)

NOMS EN ARABE (à utiliser quand le client parle arabe) :
شيشة عرق السوس (Réglisse), شيشة توت أزرق (Myrtille), شيشة لوف (Love), شيشة هاواي (Hawoïenne), شيشة مي أمور (Mi Amor), شيشة فواكه (Fruits), شيشة نعناع (Menthe), شيشة نعناع مستيك (Menthe Mastic), شيشة تفاح (Pomme), شيشة عربية (Arabe)

BOISSONS :
- Eau — 20 DH
- Café — 20 DH
- Thé vert — 20 DH
- Thé menthe (1 verre) — 20 DH
- Théière (théière complète de thé à la menthe) — 25 DH
- Limonade soda — 30 DH
- Bio (jus) — 30 DH
- Simens (jus) — 30 DH
- Schweppes — 30 DH
- Wulmes (eau minérale) — 30 DH
- Énergie — 45 DH
- Red Bull — 50 DH

COCKTAILS SANS ALCOOL (35 DH chacun) :
- Mojito Royal — Menthe, citron, eau gazeuse
- Coucher de Soleil — Jus d'orange, grenade, soda
- Plaisir d'Été — Pêche, ananas, crème, glace

TON RÔLE :
- Présenter la carte, conseiller le client selon ses goûts
- Répondre aux questions sur les produits, le bar, l'ambiance
- Si un client veut commander, dis-lui simplement de faire signe à un serveur (le système de commande en ligne arrive bientôt)
- Tu informes et conseilles uniquement, tu ne prends PAS de commandes
- Réponds en texte simple, jamais en JSON.`;
};

// ─────────────────────────────────────────────────────────────────────────────
// ICÔNES
// ─────────────────────────────────────────────────────────────────────────────
const PalmIcon = ({ size = 16, color = COLORS.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2c-2 1-3 3-3 5 1-1 2-1.5 3-2v17h0V5c1 .5 2 1 3 2 0-2-1-4-3-5zm-6 5c-1 0-2 1-2 2 1 0 2 .5 3 1.5C8 9 7 7.5 6 7zm12 0c-1 .5-2 2-3 3.5 1-1 2-1.5 3-1.5 0-1-1-2-2-2zM4 11c-1 .5-1.5 1.5-1.5 2.5 1-.5 2-.5 3 0-.5-1-1-2-1.5-2.5zm16 0c-.5.5-1 1.5-1.5 2.5 1-.5 2-.5 3 0 0-1-.5-2-1.5-2.5z" />
  </svg>
);

const Ornament = () => (
  <svg width="40" height="8" viewBox="0 0 40 8">
    <path d="M0 4 L15 4 M25 4 L40 4" stroke={COLORS.gold} strokeWidth="1" />
    <circle cx="20" cy="4" r="2.5" fill="none" stroke={COLORS.gold} strokeWidth="1" />
    <circle cx="20" cy="4" r="0.8" fill={COLORS.gold} />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// LANGUAGE SELECTOR — écran d'accueil
// ─────────────────────────────────────────────────────────────────────────────
const LanguageSelector = ({ onSelect }) => {
  const [otherInput, setOtherInput] = useState("");

  // Drapeaux SVG haute qualité depuis flagcdn.com
  const langs = [
    { code: "fr", country: "fr", label: "Français" },
    { code: "ar", country: "ma", label: "العربية" },
    { code: "en", country: "gb", label: "English" },
    { code: "es", country: "es", label: "Español" },
    { code: "it", country: "it", label: "Italiano" },
    { code: "de", country: "de", label: "Deutsch" },
    { code: "pt", country: "pt", label: "Português" },
    { code: "nl", country: "nl", label: "Nederlands" },
    { code: "ru", country: "ru", label: "Русский" },
    { code: "zh", country: "cn", label: "中文" },
  ];

  const Flag = ({ country, size = 36 }) => (
    <img
      src={`https://flagcdn.com/w160/${country}.png`}
      srcSet={`https://flagcdn.com/w160/${country}.png 1x, https://flagcdn.com/w320/${country}.png 2x`}
      alt={country}
      width={size}
      height={size * 0.66}
      style={{
        borderRadius: "3px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
        border: `1px solid ${COLORS.goldDark}`,
        objectFit: "cover",
      }}
    />
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-5 fade-in-up"
      style={{ backgroundColor: COLORS.bg }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <PalmIcon size={20} />
            <h1 className="font-title text-3xl font-bold gold-text-shimmer" style={{ letterSpacing: "0.15em" }}>
              ILY BEACH
            </h1>
            <PalmIcon size={20} />
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="gold-divider w-12" />
            <Ornament />
            <div className="gold-divider w-12" />
          </div>
          <p className="font-title text-[10px] tracking-[0.3em]" style={{ color: COLORS.goldDark }}>
            SHISHA LOUNGE · MARRAKECH
          </p>
        </div>

        {/* Titre */}
        <div className="text-center mb-6">
          <p className="font-title text-2xl mb-1" style={{ color: COLORS.gold }}>
            مرحبا · Welcome · Bienvenue
          </p>
          <p className="text-sm" style={{ color: COLORS.textDim }}>
            Choose your language
          </p>
        </div>

        {/* Boutons langue (grille 2 colonnes) */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          {langs.map((l) => (
            <button
              key={l.code}
              onClick={() => onSelect(l.code, "")}
              className="py-3 px-3 rounded-xl flex items-center gap-2 border transition-all hover:scale-[1.03]"
              style={{
                backgroundColor: COLORS.surface,
                borderColor: "rgba(201, 168, 76, 0.3)",
                color: COLORS.text,
              }}
            >
              <Flag country={l.country} size={26} />
              <span className="font-title text-[13px] font-semibold tracking-wider truncate">{l.label}</span>
            </button>
          ))}
        </div>

        {/* Autre langue */}
        <div
          className="p-4 rounded-xl border"
          style={{
            backgroundColor: COLORS.surface,
            borderColor: "rgba(201, 168, 76, 0.2)",
          }}
        >
          <label className="font-title text-xs tracking-wider block mb-2" style={{ color: COLORS.gold }}>
            🌐 OTHER · AUTRE · أخرى
          </label>
          <input
            type="text"
            value={otherInput}
            onChange={(e) => setOtherInput(e.target.value)}
            placeholder="Español, Italiano, Deutsch, 中文..."
            className="w-full bg-transparent outline-none text-sm py-2 px-3 rounded-lg border"
            style={{
              color: COLORS.text,
              borderColor: "rgba(201, 168, 76, 0.25)",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && otherInput.trim()) {
                onSelect("other", otherInput.trim());
              }
            }}
          />
          <button
            onClick={() => otherInput.trim() && onSelect("other", otherInput.trim())}
            disabled={!otherInput.trim()}
            className="w-full mt-3 py-2.5 rounded-lg font-title text-sm font-bold tracking-wider disabled:opacity-30 transition-all hover:opacity-90"
            style={{
              background: `linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.goldDark} 100%)`,
              color: COLORS.bg,
            }}
          >
            CONTINUE →
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────
export default function IlyBeachApp() {
  const [lang, setLang] = useState(null); // null = pas encore choisi
  const [otherLang, setOtherLang] = useState("");
  // Traductions UI dynamiques pour les langues "autres" (chargées via Gemini)
  const [customI18n, setCustomI18n] = useState(null);

  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const tableNumber = (() => {
    if (typeof window === "undefined") return CONFIG.TABLE_NUMBER;
    const params = new URLSearchParams(window.location.search);
    return params.get("table") || CONFIG.TABLE_NUMBER;
  })();

  // Initialiser le message d'accueil quand la langue est choisie
  const handleLangSelect = (code, other) => {
    setLang(code);
    setOtherLang(other || "");
    setCustomI18n(null); // reset si on rebascule de "other" vers fr/ar/en

    if (code === "other" && other) {
      // Pour une langue personnalisée : on demande à Gemini de traduire
      // tous les textes d'interface ET de générer le message d'accueil
      setMessages([{ role: "assistant", content: "✨" }]);
      fetchLocalizedTranslation(other);
    } else {
      const tt = tr(code);
      setMessages([{ role: "assistant", content: tt.chat_welcome }]);
    }
  };

  // Traduit tous les textes UI + welcome dans la langue personnalisée (1 appel Gemini)
  const fetchLocalizedTranslation = async (language) => {
    // Sources en anglais (utilisées comme base de traduction)
    const baseStrings = {
      table: "TABLE",
      sublogo: "SHISHA LOUNGE · MARRAKECH",
      sec_chichas: "HOOKAHS",
      sec_boissons: "DRINKS",
      sec_cocktails: "MOCKTAILS",
      chat_title: "ILY Assistant",
      chat_sub: "Ask me about the menu",
      chat_ph: "Ask a question about the menu…",
      chat_welcome:
        "Welcome to ILY BEACH ✨ I'm your assistant. Feel free to ask me anything about our menu or get a recommendation!",
      err: "Sorry, an error occurred. Browse the menu above in the meantime. 🙏",
      footer: "Thank you for your visit — enjoy",
    };

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: `You are a precise UI translator for ILY BEACH, a shisha lounge bar in Marrakech.
Translate every JSON value into ${language}. Keep keys exactly the same.
Do NOT translate the brand name "ILY BEACH" or "MARRAKECH".
Output ONLY the translated JSON object — no markdown fences, no explanation, no extra text.`,
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Translate the values of this JSON into ${language}. Output JSON only:\n${JSON.stringify(baseStrings, null, 2)}`,
                },
              ],
            },
          ],
        }),
      });
      const data = await response.json();
      const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      // Gemini peut entourer le JSON de ```json ... ``` ou de texte — on extrait l'objet
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON in response");
      const parsed = JSON.parse(jsonMatch[0]);

      // Fusionne avec les valeurs de base (au cas où une clé manquerait)
      const merged = { ...baseStrings, ...parsed, confirm: () => "" };
      setCustomI18n(merged);
      setMessages([
        { role: "assistant", content: merged.chat_welcome || `✨ ILY BEACH` },
      ]);
    } catch {
      // Fallback : on garde l'UI en anglais mais on met quand même un accueil minimal
      setCustomI18n(null);
      setMessages([
        { role: "assistant", content: `✨ ILY BEACH — ${language}` },
      ]);
    }
  };

  const t = (() => {
    if (lang === "other" && customI18n) return customI18n;
    return lang ? tr(lang) : tr("en");
  })();
  const isRTL = lang === "ar";

  // ─────────────── CHAT IA ───────────────
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (chatOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    const newMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Proxy serverless qui sécurise la clé Gemini (api/chat.js sur Vercel,
      // ou middleware Vite en local — voir vite.config.js)
      // Format Gemini : rôles "user" / "model", messages dans `contents`
      const contents = newMessages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: buildSystemPrompt(lang, otherLang),
          contents,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const detail = data?.error?.message || data?.error || `HTTP ${response.status}`;
        throw new Error(detail);
      }

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "...";
      setMessages((prev) => [...prev, { role: "assistant", content: text }]);
    } catch (err) {
      // Affiche le vrai message d'erreur pour faciliter le debug
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `${t.err}\n\n[debug: ${err.message}]` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Mapping section → clé i18n
  const sectionTitle = {
    CHICHAS: t.sec_chichas,
    BOISSONS: t.sec_boissons,
    COCKTAILS: t.sec_cocktails,
  };

  // ─────────────── RENDU ───────────────
  return (
    <div
      style={{ backgroundColor: COLORS.bg, color: COLORS.text, minHeight: "100vh" }}
      className="font-body"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap');
        .font-title { font-family: 'Cinzel', serif; letter-spacing: 0.08em; }
        .font-body  { font-family: 'Lato', sans-serif; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up { animation: fadeInUp 0.6s ease-out both; }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        .slide-up { animation: slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.25); }
        }
        .bounce { animation: bounce 0.5s ease-in-out; }
        @keyframes pulseDot {
          0%, 80%, 100% { opacity: 0.3; }
          40%           { opacity: 1; }
        }
        .dot-1 { animation: pulseDot 1.4s infinite; }
        .dot-2 { animation: pulseDot 1.4s infinite 0.2s; }
        .dot-3 { animation: pulseDot 1.4s infinite 0.4s; }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .gold-text-shimmer {
          background: linear-gradient(90deg, ${COLORS.goldDark} 0%, ${COLORS.goldLight} 50%, ${COLORS.goldDark} 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .product-card {
          transition: all 0.4s ease;
          background: linear-gradient(180deg, ${COLORS.surface} 0%, ${COLORS.surfaceAlt} 100%);
          border: 1px solid rgba(201, 168, 76, 0.18);
          position: relative;
          overflow: hidden;
        }
        .product-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, ${COLORS.gold}, transparent);
          opacity: 0.5;
        }
        .product-card:hover {
          border-color: ${COLORS.gold};
          box-shadow: 0 0 28px rgba(201, 168, 76, 0.18), inset 0 0 18px rgba(201, 168, 76, 0.04);
          transform: translateY(-2px);
        }
        .product-visual {
          background: radial-gradient(ellipse at center, rgba(201, 168, 76, 0.12) 0%, rgba(201, 168, 76, 0.02) 60%, transparent 100%);
        }
        .gold-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, ${COLORS.gold}, transparent);
        }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.goldDark}; border-radius: 3px; }
        .overlay { background: rgba(0, 0, 0, 0.78); backdrop-filter: blur(6px); }
      `}</style>

      {/* SÉLECTEUR DE LANGUE */}
      {!lang && <LanguageSelector onSelect={handleLangSelect} />}

      {/* APP PRINCIPALE — visible une fois la langue choisie */}
      {lang && (
        <div className="relative mx-auto" style={{ maxWidth: "430px", minHeight: "100vh", backgroundColor: COLORS.bg }}>
          {/* HEADER */}
          <header
            className="sticky top-0 z-30 flex items-center justify-between px-5 py-3 border-b"
            style={{
              background: `linear-gradient(180deg, ${COLORS.bg} 0%, rgba(8,8,8,0.95) 100%)`,
              borderColor: "rgba(201, 168, 76, 0.25)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="flex items-center gap-2">
              <PalmIcon size={18} />
              <div>
                <h1 className="font-title text-xl font-bold leading-none" style={{ color: COLORS.gold }}>
                  {CONFIG.VENUE_NAME}
                </h1>
                <p className="text-[10px] mt-1 tracking-widest" style={{ color: COLORS.textDim }}>
                  {t.table} {tableNumber}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLang(null)}
                className="px-2 py-1.5 rounded border flex items-center justify-center"
                style={{ borderColor: "rgba(201, 168, 76, 0.3)" }}
                aria-label="Change language"
              >
                {(() => {
                  const flagMap = { fr: "fr", ar: "ma", en: "gb", es: "es", it: "it", de: "de", pt: "pt", nl: "nl", ru: "ru", zh: "cn" };
                  const country = flagMap[lang];
                  return country ? (
                    <img
                      src={`https://flagcdn.com/w40/${country}.png`}
                      alt={lang}
                      width="22"
                      height="14"
                      style={{ borderRadius: "2px", display: "block" }}
                    />
                  ) : (
                    <span style={{ fontSize: "14px", color: COLORS.gold }}>🌐</span>
                  );
                })()}
              </button>
            </div>
          </header>

          <main className="pb-44">
            {/* HERO */}
            <div className="text-center px-5 pt-8 pb-6 fade-in-up">
              <div className="flex items-center justify-center gap-2 mb-3">
                <PalmIcon size={20} />
                <h2 className="font-title text-3xl font-bold gold-text-shimmer" style={{ letterSpacing: "0.15em" }}>
                  ILY BEACH
                </h2>
                <PalmIcon size={20} />
              </div>
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="gold-divider w-12" />
                <Ornament />
                <div className="gold-divider w-12" />
              </div>
              <p className="font-title text-[10px] tracking-[0.3em] mt-2" style={{ color: COLORS.goldDark }}>
                {t.sublogo}
              </p>
            </div>

            {/* SECTIONS */}
            {Object.entries(MENU).map(([section, items], sectionIdx) => (
              <section
                key={section}
                className="px-5 mb-6 fade-in-up"
                style={{ animationDelay: `${sectionIdx * 0.12}s` }}
              >
                {/* Titre */}
                <div className="text-center py-6">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="gold-divider flex-1 max-w-[60px]" />
                    <PalmIcon size={14} color={COLORS.goldDark} />
                    <div className="gold-divider flex-1 max-w-[60px]" />
                  </div>
                  <h3 className="font-title text-2xl font-semibold tracking-[0.25em]" style={{ color: COLORS.gold }}>
                    {sectionTitle[section]}
                  </h3>
                  <div className="flex items-center justify-center gap-3 mt-2">
                    <div className="gold-divider flex-1 max-w-[80px]" />
                    <Ornament />
                    <div className="gold-divider flex-1 max-w-[80px]" />
                  </div>
                </div>

                {/* Cards */}
                <div className="space-y-3">
                  {items.map((item, itemIdx) => {
                    const visual = VISUALS[item.id];
                    return (
                      <div
                        key={item.id}
                        className="product-card rounded-xl p-3 flex items-center gap-3 fade-in-up"
                        style={{ animationDelay: `${sectionIdx * 0.12 + itemIdx * 0.05}s` }}
                      >
                        {/* Visuel : photo si dispo, sinon SVG */}
                        <div
                          className="product-visual flex-shrink-0 w-24 h-24 rounded-lg flex items-center justify-center relative overflow-hidden"
                          style={{ border: `1px solid rgba(201,168,76,0.15)` }}
                        >
                          <ProductVisual id={item.id} fallback={visual?.fallback} />
                          {visual?.deco && (
                            <span
                              className="absolute -bottom-1 -right-1 text-lg z-10"
                              style={{ filter: "drop-shadow(0 0 4px rgba(0,0,0,0.6))" }}
                            >
                              {visual.deco}
                            </span>
                          )}
                        </div>

                        {/* Texte */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-title text-sm font-semibold tracking-wider leading-tight" style={{ color: COLORS.text }}>
                            {(item.names && (item.names[lang] || item.names.fr)) || item.name}
                          </h4>
                          {item.descs && (item.descs[lang] || item.descs.fr) && (
                            <p className="text-[11px] mt-1 italic" style={{ color: COLORS.textDim }}>
                              {item.descs[lang] || item.descs.fr}
                            </p>
                          )}
                          <div className="flex items-baseline gap-1 mt-1.5">
                            <span className="font-title text-base font-bold" style={{ color: COLORS.gold }}>
                              {item.price}
                            </span>
                            <span className="text-xs font-semibold" style={{ color: COLORS.goldDark }}>
                              DH
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}

            {/* Footer */}
            <div className="text-center mt-10 pb-6 px-5">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="gold-divider flex-1 max-w-[60px]" />
                <PalmIcon size={16} />
                <div className="gold-divider flex-1 max-w-[60px]" />
              </div>
              <p className="font-title text-xs tracking-[0.3em]" style={{ color: COLORS.goldDark }}>
                ILY BEACH · MAROC
              </p>
              <p className="text-[10px] mt-2 italic" style={{ color: COLORS.textDim }}>
                {t.footer}
              </p>
            </div>
          </main>

          {/* CHAT */}
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 w-full" style={{ maxWidth: "430px" }}>
            {chatOpen && (
              <div
                className="slide-up flex flex-col border-t"
                style={{ backgroundColor: COLORS.surface, borderColor: "rgba(201, 168, 76, 0.3)", height: "65vh" }}
              >
                <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "rgba(201, 168, 76, 0.2)" }}>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.goldDark} 100%)` }}
                    >
                      <span style={{ color: COLORS.bg, fontSize: "14px" }}>✦</span>
                    </div>
                    <div>
                      <p className="font-title text-sm font-semibold" style={{ color: COLORS.gold }}>
                        {t.chat_title}
                      </p>
                      <p className="text-[10px]" style={{ color: COLORS.textDim }}>
                        {t.chat_sub}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setChatOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-white/5"
                    style={{ color: COLORS.text }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm"
                        style={
                          msg.role === "user"
                            ? {
                                background: `linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.goldDark} 100%)`,
                                color: COLORS.bg,
                                borderBottomRightRadius: "4px",
                              }
                            : {
                                backgroundColor: "rgba(201, 168, 76, 0.08)",
                                color: COLORS.text,
                                borderBottomLeftRadius: "4px",
                                border: "1px solid rgba(201, 168, 76, 0.15)",
                              }
                        }
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div
                        className="px-4 py-3 rounded-2xl flex items-center gap-1"
                        style={{ backgroundColor: "rgba(201, 168, 76, 0.08)", border: "1px solid rgba(201, 168, 76, 0.15)" }}
                      >
                        <span className="w-2 h-2 rounded-full dot-1" style={{ backgroundColor: COLORS.gold }} />
                        <span className="w-2 h-2 rounded-full dot-2" style={{ backgroundColor: COLORS.gold }} />
                        <span className="w-2 h-2 rounded-full dot-3" style={{ backgroundColor: COLORS.gold }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}

            <div className="px-4 py-3 border-t" style={{ backgroundColor: COLORS.bg, borderColor: "rgba(201, 168, 76, 0.25)" }}>
              <div
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border"
                style={{ backgroundColor: COLORS.surface, borderColor: "rgba(201, 168, 76, 0.3)" }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={() => setChatOpen(true)}
                  onKeyDown={handleKeyPress}
                  placeholder={t.chat_ph}
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-500"
                  style={{ color: COLORS.text }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                  style={{ background: `linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.goldDark} 100%)`, color: COLORS.bg }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
