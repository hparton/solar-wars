import {findByKey} from '../js/utils';

export const Bot = function(world, faction) {
	this.faction = faction;
	this.world = world;
}

Bot.prototype.doTurn = function(callback) {
	if (callback) {
		callback();
	} else {
		throw "No function provided to doTurn, crashing.";
	}
}

// Return an array of all my fleets in flight.
Bot.prototype.myFleets = function() {
	var myFleets = [];

	for (var i = 0; i < this.world.flocks.length; i++) {

		if (this.world.flocks[i].faction == this.faction) {
			myFleets.push(this.world.flocks[i]);
		}
	}

	return myFleets;
}

// Return an array of just my planets.
Bot.prototype.myPlanets = function() {
	var myPlanets = [];

	for (var i = 0; i < this.world.planets.length; i++) {

		if (this.world.planets[i].faction == this.faction) {
			myPlanets.push(this.world.planets[i]);
		}
	}

	return myPlanets;
}

// Return an array of enemy and neutral planets
Bot.prototype.notMyPlanets = function() {
	var notMyPlanets = [];

	for (var i = 0; i < this.world.planets.length; i++) {

		if (this.world.planets[i].faction != this.faction) {
			notMyPlanets.push(this.world.planets[i]);
		}
	}

	return notMyPlanets;
}