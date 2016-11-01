import {Bot} from './bot';

export const bullyBot = function (world, faction) {
	Bot.apply(this, arguments);
	this.world = world;
	this.faction = faction;
}

bullyBot.prototype = Object.create(Bot.prototype);

bullyBot.prototype.doTurn = function() {
	var fleetLimit = 5;

	if (this.notMyPlanets().length === 0) {
		document.location.reload();
	}

	// Enemy AI (Placeholder) Each turn send a fighter to a random planet (friendly or enemy).
	// if (this.myFleets().length <= fleetLimit) {
		// this.notMyPlanets()[rand(0, this.notMyPlanets().length -1, 1)].spawnFighters(world, world.planets[rand(0, world.planets.length -1, 1)].id)
	// }

	// (1) If we are sending a fleet, do nothing.
	if (this.myFleets().length >= fleetLimit) {
		return;
	}

	// (2) Find my strongest planet;
	var myPlanets = this.myPlanets();
	var strongestPlanet = null;
	var strongestScore = 0;

	for (var i = 0; i < myPlanets.length; i++) {
		if (myPlanets[i].fighters > strongestScore) {
			strongestPlanet = myPlanets[i];
			strongestScore = strongestPlanet.fighters;
		}
	}

	// (3) Find the weakest enemy or neutral planet.
	var notMyPlanets = this.notMyPlanets();
	var weakestPlanet = null;
	var destScore = 0;

	for (var i = 0; i < notMyPlanets.length; i++) {
		var score = 1.0 / (1 + notMyPlanets[i].fighters);

		if (score > destScore) {
			destScore = score;
			weakestPlanet = notMyPlanets[i];
		}
	}

	// (4) Send half my ships from my strongest planet to the weakest planet
	// that i do not own.

	if (strongestPlanet != null && weakestPlanet != null) {
		if (strongestPlanet.fighters > 15) {
			this.world.issueOrder(strongestPlanet, weakestPlanet);
		}
	}
 }