# Cyber Mastery — Aggregated Vision

This document consolidates all planning notes for Cyber Mastery: a game development and publishing company built around a shared universe of interconnected games. It is organized for reading — not as a raw dump of source files.

---

## 1. Company Vision

Cyber Mastery is a game development and publishing company. The long-term goal is a portfolio of games that share a universe, a platform, and design DNA — not isolated products.

### Games on the Radar

| Game | Status in notes |
|------|-----------------|
| **Latgalia 2** | Extensive design notes (flagship UO-like MMO) |
| **To the Top (3T)** | GTA 2-inspired open-world megapolis |
| **Quad Domination (QD)** | Massive 4X grand strategy |
| **Sci-Fi Horror** | Survival horror on a giant spaceship |
| **Reptiloid** (Cradle and Scorch) | Listed, not yet detailed |
| **Online TD** | Listed, not yet detailed |
| **Rogue-like RPG** (Wild West) | Listed, not yet detailed |
| **Texaria-like endless digger** | Listed, not yet detailed |
| **Dark dungeon with bonfires** | Rooms guarded by monsters; player must light bonfires in corners |

---

## 2. The Shared Universe

All games live in the same universe. Genre and setting may differ radically, but common rules and cross-game travel bind them together.

### Core Rules

- **Skills and stats grow by use** — like Ultima Online. Unlike UO, they degrade very slowly when unused.
- **Not every skill applies in every game** — skills are contextual to each title.
- **Characters can travel between games** — the universe is a connected meta-layer, not a cosmetic skin.
- **NPCs remember every player they interact with** — persistent social memory across the world.
- **The world is shaped by players** — player actions have lasting effects.

### Technical & Design Constraints

- Mobile-first
- 2D / 2.5D
- Idle and offline mechanics where appropriate

### The Matrix Layer

A meta-narrative thread runs through the universe:

- Humanity lives on **level 57 of the Matrix**. Elites are not villains — they monitor humanity and hold knowledge of the real world. Humanity descended deeper into the Matrix to gain more time; each level grants a **×10 time boost**.
- **Cross-game item transfer** is allowed: items from other games can appear with attributes that do not normally exist in the current game. This requires risk, probability, limitation, and skill.
- **Three attitudes toward other worlds**: people and NPCs who ignore them, opportunists who exploit them, and cultists who oppose them.
- Players may encounter a **developer character** who tells them they need to install another game.
- A recurring character appears across games — hints about exiting the Matrix. He does not pick sides; he follows his own path.

---

## 3. Shared Platform & Systems

All games should share backend services. The notes suggest building something comparable to PlayFab.

### Core Services

| System | Purpose |
|--------|---------|
| **User** | Accounts, identity, cross-game profiles |
| **Currency** | Shared or bridged economies |
| **Inventory** | Item ownership, cross-game transfer |
| **Lore** | Unique lore pages combinable into books |
| **NPC** | Persistent NPC memory and behavior |

### Platform Ideas

- **One game client to rule them all** — a single client for the whole universe.
- **Public backlog with feature voting** — community-driven development.
- **Record all player actions** to train ML models.
- **Character sharing** — rent a character; the renter can access only their own bank.
- **Paid items**: merch, feature priority, call the developer, lunch with the developer, real adventure with swords and magic.
- **Multiple leaderboards, statistics, recaps** — merch for winners.
- **Collectibles** — like a Fallout bobblehead or Metro teddy bear.
- **Alternative to Twitch streaming** inside the game — still an open question.

---

## 4. Design Philosophy & Influences

### Ultima Online Lineage

Reference games in the UO tradition:

- **Wurm**
- **Legends of Ultima** (Legends of Aria backed)

### Games to Study

- [Space Station 13](https://en.wikipedia.org/wiki/Space_Station_13) — emergent multiplayer chaos, systems depth
- [Outer Wilds](https://store.steampowered.com/app/753640/Outer_Wilds/) — exploration, mystery, interconnected world

### Industry Contacts & Resources

People contacted for inspiration during a career transition toward game design/entrepreneurship:

- Sid Meier (Facebook)
- John Romero (Facebook, LinkedIn)
- Eric Baptizat (Assassin's Creed Origins)
- Civilization V team connections

Design resources:

- [Raph Koster](https://www.raphkoster.com/)
- [The Designers' Notebook](http://www.designersnotebook.com/)
- [Evan Adams](https://www.linkedin.com/in/ewadams/) — asks for an email

### Guiding Principles (from Latgalia notes)

- **Never reveal exact formulas** — this is a different kind of game.
- **No artificial waiting or excessive clicks** — if waiting exists, it must feel natural; provide things to do while waiting.
- **Resources are not limitless** — scarcity matters.
- **First build flexible, possibly complex logic** — strict definitions can come later via code generation.
- **Developer cares about the player** — ask if they drank water; tell them they've been playing too long.
- **Start without a name or account** — prompt organically during play.

---

## 5. Latgalia 2

The most detailed game in the notes. A deep sandbox MMO in a real-world-inspired setting (Latgalia region), built on UO-like systems with modern platform ambitions.

### World & Generation

- **Terrain types**: air, water, and skies are terrain — not just ground.
- **Level 0** is sea level; altitude affects properties of areas.
- **Mandatory objects** with permanent coordinates; ability to generate additional tiles into an area.
- **Zero coordinates at world center** — generation must work in all directions (including negative coordinates: 000, 001, etc.).
- **Enclosed areas** — generate areas surrounded by walls or mountains with an entrance.
- **No grass block below another grass block** — structural generation rules.
- **Digging the floor** may cause falling into underlying areas.
- **Every building floor** is its own generated area.
- **Tile scale**: 1 tile = one step? 1 level = person's height? — distances must be planned from this.
- **World form** — still an open question.
- Study cellular automata and related algorithms before reinventing.
- **Real Latgalia weather** and day/night proportions.
- **Holes in terrain**: horses can jump over them (button + skill; at 100% skill, no button needed). Define climb depth for players and horses.
- **Trap protection** for newbies against experienced players.

### Clans & Factions

- **Peace Keepers** and **Player Killers** — dual factions leading the fight between duality of the universe.

### Combat & Skills

- **Distance and speed of arrows** depend on skill; crossbows have larger max range than bows.
- **Shooting while moving** — possible but with much higher period than standing.
- **Knockback and slowdown perks** for ranged skills.
- **Mages do not crit** — they bypass armor unless armor has specific resistance.
- **Sticky surface spell** to slow enemies.
- **Poison cloud** spell/bottle.
- **Mob ID skill** with perks highlighting mobs with cool loot, your loot, or progressed skills.
- **Perks for kicking opponents from horses**.
- **Loss of intellect** on head injury.
- **Counter skills** for slippery surfaces during rain, snow, and ice.
- **Pendulum mechanic** for skill execution (lockpicking, cooking) — slower pendulum at higher skill.
- **Magic to forbid PvP** — players can create PvP-free zones.
- **Increlution-inspired**: instinct vs. skill; automate things done many times.
- **Bonus for in-game time** — berserk-like mechanic.
- **Astrology, moon calendars** — Elder Scrolls / Heroes of Might and Magic style.

### Pets, Animals & Enemies

- **Every enemy can be tamed**.
- **Every pet can wear armor** — one set, not pieces; better pets need higher skills.
- **Mercenaries** can be given regular armor and weapons.
- **Gopniks** — weak alone, aggressive in groups.
- **Thieves** — masters of hiding and stealth.
- **Dead monsters** go to the shadow-world with all their skills.
- **Necromancer in the cemetery** — massive health, doesn't damage players but constantly raises corpses that attack players and move toward town.
- **Bot mages beyond the mountains** — damage players who try to destroy the mountain.

### Economy, Crafting & Items

- **Inventory is headless** — UI is for the Player assembly; the character uses inventory via UI.
- **Inventory system with GameObjects** for all items.
- **Automation potions/kegs** — program character to equip a weapon of the same class as the destroyed one.
- **Different forge levels** — municipal forge is not the best.
- **Body constitution / classes affect food** — mages eat apples, warriors eat meat.
- **Dragon ass skin clothes**.
- **Any spell can be alchemized or scripted**.
- **Sell bugs** — price to view, price to remove.
- **Books** — read, write, create libraries, sell (NFTs?).
- **Each lore page is unique** and can be combined into books.
- **Unique item sets** per player.
- **Caravans from other worlds**.
- **Cheap newbie house?**

### Social, Reputation & Politics

- **Share geographical discoveries** with party, guild, or community — earn points.
- **NPCs react to bad names** — refuse to work or mock.
- **Reputation changes use radius calculations**.
- **Quest deadlines** — miss the deadline, reputation drops.
- **Rating of things done between deaths**.
- **Delegate character control** to another player for a time or forever.
- **Provoke attacks** to attract guards and loot.
- **Real war with a moving frontline**.
- **Public backlog with feature voting**.

### Death, Lives & Character

- **Choice of last phrase before death** — "I'll try in the next life", "I hate how weak I am", etc. No consequences, just expression.
- **Limited lives** — earn lives by killing NPCs or other players.
- **Developer character** with random stats each reincarnation; killing developer has chance to loot real-life merch.
- **Make kids and transfer traits** to children.
- **Houses are invulnerable** while the player is offline.

### World Systems & Gods

- **Ruins with world-impact tools** — e.g., wire something in ruins, exit, and now flying dogs exist for all players.
- **Mining and lumberjacking anger ore and wood gods** — with paths to friendship and benefits.
- **Digging down** — police can prohibit digging in certain areas.
- **Less resources near spawn** to avoid long gathering cycles.
- **Shadows** — standing in shadows improves hiding.
- **Village soldiers** search for new players; some find players randomly.

### Meta & Community

- **Early adopter badge** — "You were here when almost no one believed in this".
- **Use Prokopchuk's music**.
- **Use Adrian von Ziegler's Inra language** for a tribe.
- **Dwarf Fortress-inspired emotions** — 100+ emotions.
- **Guess who's NPC** — social deduction element.
- **Live with AI friends and/or spouses** in the game.
- **Random quest outcomes** — random reward, no reward (lying quest giver), quest giver dead by end, etc.
- **Lazy load of classifiers for Lambda** (technical note).

### Newbie Experience

- **Guild of mages' spell on newbie dungeon** — prevents PvP, or active guards.
- **Protection from traps** set by experienced players.

---

## 6. To the Top (3T)

A GTA 2-inspired open-world game in a modern New York-like megapolis.

### Features

- Police and wanted levels
- Open world with missions
- Car theft and driving
- Weapons, shops, crafting and weapon upgrades
- Inventory management, saving and loading
- Destructible environments
- Weather affecting vision and driving
- Gangs, racing, gambling
- Police bribes
- Stealth
- Massive multiplayer
- Day-night cycle
- Reputation system

---

## 7. Quad Domination (QD)

A massive 4X grand strategy game — "the most massive 4X experience." Turns that never end. Grand strategy must be global.

### Core Identity

- Named as players want.
- **W** — whose building is the biggest.
- Like Civ: special units, buildings, and traits per civilization.
- **Civilization leaders** can be real players, displayed prominently (Snapchat-style cartooning).
- Story for each game character.
- Not so easy to send to death the ones you know.

### Setting & Lore

Post-apocalyptic world shaped by AI rights, feminist politics, and nuclear war:

- AI fought for their rights (Detroit: Become Human). A feminist vegan woman president approved them. They became like in a French movie with Yonix. Then AI won the election.
- **AI killed us** — not with laser guns, but by making truth unknowable.
- War with feminists and similar-minded people — they won. People are not born; they are bred.
- **Super wealthy people** created closed tech cities and started nuclear war to eliminate others.
- **Genetic mutations** from radiation and environmental adaptation.
- **Immortal people** immune to radiation — cults kill them as devils or praise them as humanity's future.
- **Cult of natural birth**.
- **Exoskeletons**, motorized trash islands.
- Traces of world government.
- **Great prophet's command**: never restore civilization.
- Infiltrate another vault and start a rebellion.
- Father who named children after ancient car brands.
- Cannibals who don't kill but cut pieces from slaves periodically for fresh meat.
- Rediscover technology and knowledge.
- **Doomsday clock**.
- Constantly update links to the real modern world.

### Design Philosophy

In most games, heroes lead faceless identical units; battles follow strict arithmetic with added randomness. In reality, people are not identical — even clones diverge. Battles depend on hunger, sleep, friendship, sex, and countless traits. A leader's personality should not be "+5 attack" — it aligns diverse people toward a shared vector. This game exposes what's underneath abstract "morale" and "spirit" and lets players influence individual choices for team results.

In games, animals and people do not poo and pee. Why? (Open design question.)

### Mechanics

- **Turn process**: player makes a move → server validates → saves → finishes turn → calculates quad changes → reveals/creates cubes.
- **1-minute moves** even offline — core mechanic; fill the minute with action.
- **Autospawn, automove** (autodiscovery, patrolling, with conditional options).
- **Intuition** is a skill.
- Let people become sick and tired of continuous war.
- If you lose, spawn point moves further from the front line.
- "This already sounds more like Dota rather than Civ."
- After colonization, player can be part of another civ but rebel.
- **Pay for the time you do NOT play?** (monetization idea).

### Dead Unit Options

| Action | Turns |
|--------|-------|
| Bury | 1 |
| Burn and go | 0 |
| Crucify (spoil battle spirit) | 1 |
| Use for sex | 1 |
| Cut for food | 1 |
| Cut for organs (transplantation, min skill) | 1 |

### Battle Process (Technical)

1. Select from moves
2. Insert moved teams with neighbors into battles
3. Process battles in random order — attack random targets, calculate strength, modify health, handle deaths
4. Create log message, insert into turns, truncate moves

Alternative implementation uses options on team records instead of a helper battles table.

### Business

- Need to know how to register a trademark.

---

## 8. Sci-Fi Horror

A dream of sci-fi survival horror on a giant spaceship. Possibly reveals a simulation at the end.

### Core Scenario

Aliens are awakening. Robot guards are turned on — they might help, but they also anger the aliens. Players hide in a place with lots of food and mostly bulletproof entrances, but one corridor is unsafe. Hard obstacles must block it. It is dark, scary; alien locations are unknown.

### Features

- All exits closed; progress requires eliminating active aliens?
- Light switches
- AI ship helper with large conversational tree
- Restore electricity
- Personality traits — choose 2, 1 selected randomly
- Doors opened via break, hack, or sneak
- Ship split into parts based on inhabitant specialization
- Scary sounds; sounds of aliens moving and breathing

### Scope Note

Do not make everything — make the simplest version first.

---

## 9. Undocumented Games (Backlog)

Brief mentions only — no design notes yet:

- **Reptiloid** (Cradle and Scorch)
- **Online TD**
- **Rogue-like RPG** in Wild West setting
- **Texaria-like endless digger**
- **Dark dungeon with bonfires** — rooms guarded by monsters; player must light corner bonfires

---

## 10. Open Questions

Cross-cutting questions that appear across multiple games and notes:

| Area | Question |
|------|----------|
| Latgalia world | What form does the world have? |
| Latgalia scale | 1 tile = one step? 1 level = person's height? |
| Latgalia streaming | What could replace Twitch streaming inside the game? |
| Latgalia monetization | NFTs for books? |
| QD monetization | Pay for time you do NOT play? |
| QD realism | Why don't animals and people poo and pee in games? |
| Platform | Build own PlayFab-like service vs. use existing? |
| Business | How to register a trademark? |

---

## Source Files

This document was aggregated from:

- `cyber-mastery.md` — company vision and game list
- `rules-of-the-universe.md` — shared universe rules
- `systems-for-all-games.md` — platform systems
- `uo-like-games.md` — UO lineage references
- `games/latgalia.md` — Latgalia 2 design
- `games/to-the-top.md` — To the Top design
- `games/quad-domination.md` — Quad Domination design
- `games/sci-fi-horror.md` — Sci-Fi Horror design
