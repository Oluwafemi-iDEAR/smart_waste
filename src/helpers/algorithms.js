// Enhanced Route Optimization Algorithms
class EnhancedRouteOptimizer {
  // Haversine distance calculation
  static haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  // Advanced Genetic Algorithm with machine learning insights
  static geneticAlgorithm(bins, depot, capacity, generations = 150) {
    const binIds = Object.keys(bins).filter((id) => bins[id].fill_level > 60); // Smart filtering
    const populationSize = Math.min(50, binIds.length * 3);

    let population = [];
    for (let i = 0; i < populationSize; i++) {
      const routeLength = Math.min(capacity, Math.max(1, binIds.length));
      const route = this.shuffleArray([...binIds]).slice(0, routeLength);
      population.push(route);
    }

    let bestRoute = null;
    let bestFitness = -Infinity;

    for (let gen = 0; gen < generations; gen++) {
      const fitness = population.map((route) =>
        this.calculateFitness(route, bins, depot)
      );

      const bestIndex = fitness.indexOf(Math.max(...fitness));
      if (fitness[bestIndex] > bestFitness) {
        bestFitness = fitness[bestIndex];
        bestRoute = [...population[bestIndex]];
      }

      const newPopulation = [];

      // Elitism - keep best 20%
      const sortedPop = population
        .map((route, i) => ({ route, fitness: fitness[i] }))
        .sort((a, b) => b.fitness - a.fitness);

      for (let i = 0; i < Math.floor(populationSize * 0.2); i++) {
        newPopulation.push([...sortedPop[i].route]);
      }

      // Crossover and mutation
      while (newPopulation.length < populationSize) {
        const parent1 = this.tournamentSelection(population, fitness, 5);
        const parent2 = this.tournamentSelection(population, fitness, 5);
        let child = this.advancedCrossover(parent1, parent2);
        child = this.adaptiveMutation(child, binIds, gen / generations);
        newPopulation.push(child);
      }

      population = newPopulation;
    }

    const distance = this.calculateRouteDistance(bestRoute, bins, depot);
    return { route: bestRoute, distance, fitness: bestFitness };
  }

  // Enhanced fitness function considering multiple factors
  static calculateFitness(route, bins, depot) {
    if (!route || route.length === 0) return -Infinity;

    const distance = this.calculateRouteDistance(route, bins, depot);
    if (distance === Infinity) return -Infinity;

    // Priority-based scoring
    let priorityScore = 0;
    let fillLevelScore = 0;
    let gasLevelScore = 0;

    route.forEach((binId) => {
      const bin = bins[binId];
      if (!bin) return;

      // Higher priority bins get more points
      const priorityWeights = { CRITICAL: 100, HIGH: 75, MEDIUM: 50, LOW: 25 };
      priorityScore += priorityWeights[bin.priority] || 0;

      // Higher fill levels get more points
      fillLevelScore += bin.fill_level * 2;

      // Gas level considerations (higher gas = more urgent)
      gasLevelScore += Math.min(bin.gas_level / 10, 50);
    });

    // Combine factors (minimize distance, maximize priority/fill/gas urgency)
    const distancePenalty = distance * 10;
    const totalScore =
      priorityScore + fillLevelScore + gasLevelScore - distancePenalty;

    return totalScore;
  }

  // Advanced crossover with route preservation
  static advancedCrossover(parent1, parent2) {
    if (!parent1.length || !parent2.length)
      return [...(parent1.length ? parent1 : parent2)];

    const allGenes = [...new Set([...parent1, ...parent2])];
    const targetLength = Math.floor((parent1.length + parent2.length) / 2);

    // Order crossover (OX)
    const start = Math.floor(
      Math.random() * Math.min(parent1.length, parent2.length)
    );
    const end = Math.floor(
      Math.random() * Math.min(parent1.length, parent2.length)
    );
    const [startIdx, endIdx] = [Math.min(start, end), Math.max(start, end)];

    const child = new Array(targetLength);
    const used = new Set();

    // Copy segment from parent1
    for (
      let i = startIdx;
      i <= endIdx && i < parent1.length && i < targetLength;
      i++
    ) {
      child[i] = parent1[i];
      used.add(parent1[i]);
    }

    // Fill remaining positions with parent2 order
    let childIdx = 0;
    for (const gene of parent2) {
      while (childIdx < targetLength && child[childIdx] !== undefined)
        childIdx++;
      if (childIdx >= targetLength) break;
      if (!used.has(gene)) {
        child[childIdx] = gene;
        used.add(gene);
      }
    }

    return child.filter((x) => x !== undefined);
  }

  // Adaptive mutation based on generation
  static adaptiveMutation(route, allBins, progress) {
    const mutationRate = 0.3 * (1 - progress) + 0.05; // Decrease mutation over time

    if (Math.random() < mutationRate && route.length > 1) {
      const mutationType = Math.random();

      if (mutationType < 0.4) {
        // Swap mutation
        const i = Math.floor(Math.random() * route.length);
        const j = Math.floor(Math.random() * route.length);
        [route[i], route[j]] = [route[j], route[i]];
      } else if (mutationType < 0.7) {
        // Inversion mutation
        const start = Math.floor(Math.random() * route.length);
        const end = Math.floor(Math.random() * route.length);
        const [startIdx, endIdx] = [Math.min(start, end), Math.max(start, end)];
        route.splice(
          startIdx,
          endIdx - startIdx + 1,
          ...route.slice(startIdx, endIdx + 1).reverse()
        );
      } else if (mutationType < 0.85 && route.length < allBins.length) {
        // Smart insertion - prefer high priority bins
        const available = allBins.filter((bin) => !route.includes(bin));
        if (available.length > 0) {
          const randomBin =
            available[Math.floor(Math.random() * available.length)];
          route.splice(
            Math.floor(Math.random() * (route.length + 1)),
            0,
            randomBin
          );
        }
      } else if (route.length > 1) {
        // Remove lowest priority bin
        let lowestPriorityIdx = 0;
        // Remove randomly for simplicity in this context
        route.splice(Math.floor(Math.random() * route.length), 1);
      }
    }

    return route;
  }

  // Tournament selection with larger tournament size
  static tournamentSelection(population, fitness, tournamentSize = 5) {
    let best = Math.floor(Math.random() * population.length);

    for (let i = 1; i < tournamentSize; i++) {
      const challenger = Math.floor(Math.random() * population.length);
      if (fitness[challenger] > fitness[best]) {
        best = challenger;
      }
    }

    return [...population[best]];
  }

  // Ant Colony Optimization
  static antColonyOptimization(bins, depot, capacity, iterations = 100) {
    const binIds = Object.keys(bins).filter((id) => bins[id].fill_level > 50);
    const numAnts = Math.min(20, binIds.length);
    const alpha = 1; // Pheromone importance
    const beta = 3; // Heuristic importance
    const rho = 0.1; // Evaporation rate
    const Q = 100; // Pheromone constant

    // Initialize pheromone matrix
    const pheromones = {};
    binIds.forEach((id1) => {
      pheromones[id1] = {};
      binIds.forEach((id2) => {
        pheromones[id1][id2] = 1.0;
      });
    });

    let bestRoute = null;
    let bestDistance = Infinity;

    for (let iter = 0; iter < iterations; iter++) {
      const routes = [];

      // Each ant constructs a route
      for (let ant = 0; ant < numAnts; ant++) {
        const route = this.constructAntRoute(
          binIds,
          bins,
          depot,
          pheromones,
          alpha,
          beta,
          capacity
        );
        const distance = this.calculateRouteDistance(route, bins, depot);

        routes.push({ route, distance });

        if (distance < bestDistance) {
          bestDistance = distance;
          bestRoute = [...route];
        }
      }

      // Update pheromones
      this.updatePheromones(pheromones, routes, rho, Q);
    }

    return { route: bestRoute, distance: bestDistance };
  }

  static constructAntRoute(
    binIds,
    bins,
    depot,
    pheromones,
    alpha,
    beta,
    capacity
  ) {
    const route = [];
    const available = [...binIds];
    let currentPos = depot;

    while (available.length > 0 && route.length < capacity) {
      const probabilities = [];
      let totalProbability = 0;

      // Calculate probabilities for each available bin
      available.forEach((binId) => {
        const bin = bins[binId];
        const distance = this.haversineDistance(
          currentPos[0],
          currentPos[1],
          bin.location[0],
          bin.location[1]
        );
        const heuristic =
          (bin.fill_level / 100) *
          (bin.priority === "CRITICAL"
            ? 4
            : bin.priority === "HIGH"
            ? 3
            : bin.priority === "MEDIUM"
            ? 2
            : 1);

        const pheromone =
          route.length > 0
            ? pheromones[route[route.length - 1]][binId] || 1
            : 1;
        const probability =
          Math.pow(pheromone, alpha) *
          Math.pow(heuristic / (distance + 0.1), beta);

        probabilities.push({ binId, probability });
        totalProbability += probability;
      });

      // Select next bin based on probabilities
      const random = Math.random() * totalProbability;
      let cumulative = 0;
      let selectedBin = null;

      for (const prob of probabilities) {
        cumulative += prob.probability;
        if (random <= cumulative) {
          selectedBin = prob.binId;
          break;
        }
      }

      if (selectedBin) {
        route.push(selectedBin);
        available.splice(available.indexOf(selectedBin), 1);
        currentPos = bins[selectedBin].location;
      } else {
        break;
      }
    }

    return route;
  }

  static updatePheromones(pheromones, routes, rho, Q) {
    // Evaporation
    Object.keys(pheromones).forEach((id1) => {
      Object.keys(pheromones[id1]).forEach((id2) => {
        pheromones[id1][id2] *= 1 - rho;
      });
    });

    // Deposit pheromones
    routes.forEach(({ route, distance }) => {
      const pheromoneDeposit = Q / distance;
      for (let i = 0; i < route.length - 1; i++) {
        const from = route[i];
        const to = route[i + 1];
        if (pheromones[from] && pheromones[from][to] !== undefined) {
          pheromones[from][to] += pheromoneDeposit;
        }
      }
    });
  }

  static calculateRouteDistance(route, bins, depot) {
    if (!route || route.length === 0) return Infinity;

    let totalDistance = 0;
    let currentLocation = depot;

    for (const binId of route) {
      if (!bins[binId]) continue;
      const binLocation = bins[binId].location;
      totalDistance += this.haversineDistance(
        currentLocation[0],
        currentLocation[1],
        binLocation[0],
        binLocation[1]
      );
      currentLocation = binLocation;
    }

    totalDistance += this.haversineDistance(
      currentLocation[0],
      currentLocation[1],
      depot[0],
      depot[1]
    );

    return totalDistance;
  }

  static shuffleArray(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
}

export default EnhancedRouteOptimizer;
