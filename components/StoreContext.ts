"use client";
import { createContext, useContext } from "react";
import type { LiveBook } from "@/lib/data";

export type ModalKind =
  | { k: "cart" | "search" | "signup" | "join" | "coach" | "donate" | "sell" | "checkout" }
  | { k: "msg"; n: string; t: string };

export type Store = {
  items: number[]; user: string | null; menuOpen: boolean; modal: ModalKind | null;
  add(i: number): void; remove(k: number): void; placeOrder(): void;
  login(n: string): void; logout(): void;
  say(m: string): void; go(r: string): void; search(q: string): void;
  setModal(m: ModalKind | null): void;
};

export const StoreCtx = createContext<Store | null>(null);
export const BooksCtx = createContext<{ now: number | null; books: LiveBook[] }>({ now: null, books: [] });

export const useStore = () => {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("useStore must be used inside <StoreProvider>");
  return c;
};
export const useBooks = () => useContext(BooksCtx);
