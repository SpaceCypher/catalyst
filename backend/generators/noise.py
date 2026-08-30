import random
from typing import Literal

KNOWN_AI_DOMAINS = [
    "chatgpt.com",
    "perplexity.ai",
    "claude.ai",
    "copilot.microsoft.com",
    "gemini.google.com"
]

ORGANIC_REFERRERS = [
    "google.com",
    "bing.com",
    "instagram.com",
    "direct",
    "facebook.com",
    "reddit.com"
]

SPOOFED_REFERRERS = [
    "chatgpt.com",
    "perplexity.ai",
    "gemini.google.com"
]

def get_random_ai_domain(rng: random.Random) -> str:
    return rng.choice(KNOWN_AI_DOMAINS)

def get_random_organic_referrer(rng: random.Random) -> str:
    return rng.choice(ORGANIC_REFERRERS)

def get_random_spoofed_referrer(rng: random.Random) -> str:
    return rng.choice(SPOOFED_REFERRERS)
