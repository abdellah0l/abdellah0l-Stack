

// this file aggregates all the database schemas for easier import elsewhere
import * as app from "./app-schema"

import * as auth from "./auth-schema"

export const schema = {
    ...app,
    ...auth,
}

export * from "./app-schema"
export * from "./auth-schema"