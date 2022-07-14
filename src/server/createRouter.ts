import * as trpc from '@trpc/server';
import { Context } from './createContext';

export const createRouter = () => trpc.router<Context>();
