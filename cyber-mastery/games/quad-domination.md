# Quad Domination

Process of game
1. P makes a move
2. S validates the move
3. S saves the move
4. S finishes turn
5. S calculates changes in quads
6. S calculates which cubes to reveal
    1. If a quad does not exist, S creates it

I need to know how to register a trademark.

It's not so easy to send to death the ones you know, huh?

As named as players do want

W who's building is the biggest

In Civs there are special units, building and other traits of each civilisation.
The very important figure is a civilisation leader. I could make a real player to be displayed that great. Something like cartooning in Snapchat.

Story for each of the game characters

Pay for the time that you do NOT play?

What to do with dead unit?
1. Burry - 1 turn
2. Burn and go - 0 turn
3. Crucify to spoil battle spirit of others - 1 turn
4. Use for sex - 1 turn
5. Cut for food - 1 turn
6. Cut for organs for transplantation - 1 turn, requires minimal skill level
Calc of checkboxes

I should keep 1 minute long moves in QD offline also. This is the mechanics of the game. Better find how to fill this minute with action.

* Autospawn
* Automove
    * Autodiscovery
    * Patrolling
    * Both with options on what to do if X
* If you lose, you get a spawn point further away from the front line
* This already sounds more like Dota rather that Civ ))
* Intuition is a skill
* Let people become sick & tired of continuous war
* Constantly update links to the real modern world
* Великий пророк завещал ни в коем случае не восстанавливать цивилизацию
* Genetic mutations not only because of radiation but also due to specific environmental adaptations.
* Traces of the World government
* We live in the consequences of a war with feminists and other similar minded people. They won. Now people are not born, but are being breaded.
* Infiltrate into another vault and start a rebellion.
* Exoskeletons
* A father who named his children after the car brands of the ancients.
* After being colonized a player can be a part of another civ, but make rebelions
* Cannibals who don's kill people but cut of pieces off slaves from time to time to eat fresh always
* Rediscover technology and knowledge
* Motorized trash islands
* AI killed us. But not the robots with the lares guns. It just made so that we did not know where is the truth anymore.
* A cult of giving birth naturally
* A new breed of immortal people immune to radiation. There are cults that try to kill them as devils. There are cults that praise them as future for the humanity.
* Doomsday clock
* Super wealthy people created closed tech cities and started nuclear war to get rid of the other people.65g
* grand strategy has to be global
* turns that never end
* the most massive 4x experience
* 

Story
AI fought for their rights like in Detroit becomes human.
A feminist vegan woman president approved their rights.
They become like in French movie with Yonix.
Then AI wins the election.

We have got used to games with some heroes or commanders leading faceless identical people. In these games battles happen according to a strict arithmetical algorithm. We add random to this algorithm to make it no to straightforward. But in reality people are not identical. Even cloned people would not be the same after several years of life experience. In real life so many battles depend on things like hunger, did people sleep, are people in the team friends, did people have sex, and endless list of other traits. Personality of a leader should not just be simply adding +5 to the attack or morale or whatever. It helps achieve better results of a team through aligning all these different people to some extent  closer to a single vector of behaviour. In our game you will be able to see what’s underneath the obscure and abstract “morale” and “spirit” notions and influence choices of individual people to achieve great results for the whole team.

In games animals and people do not poo and pee. Why?

Turn process

1. Select from moves
2. Create log message
3. Insert into turns
4. Truncate moves

Process with battles

1. Select from moves
2. Insert moved teams that have neighbours to battles
    1. Select neighbours where player_id not me
    2. If no neighbours delete team’s all units from battles
    3. If there are neighbours, insert team and neighbours into battles
3. Select all from battles in a random order
4. Attack random targets
    1. Select from battles where neighbour order by rand
    2. Define attack strength
    3. Modify health
    4. Check if dead
    5. Update health in units if alive
    6. Update health in battles
    7. if dead
        1. Delete from units
        2. Delete from battle
        3. Select amount of units in the team
        4. Delete team if no units left
    8. Add to log message
5. Create log message
6. Insert into turns
7. Truncate moves

Process with battles using options instead of helper table
1. Select * from moves
2. Apply moves
3. Foreach moves
    1. Check if has neighbours
        1. If has in_battle = true
        2. Else in_battle = false
4.  Select from team where in_battle = 1 order rand()
    1. Select units
    2. 
