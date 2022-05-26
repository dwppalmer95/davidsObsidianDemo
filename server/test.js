import "https://deno.land/x/dotenv/load.ts";
console.log(Deno.env.get("REDIS_HOST"));