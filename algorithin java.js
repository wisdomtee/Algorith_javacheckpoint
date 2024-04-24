function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const pq = new PriorityQueue();

    // Initialize distances from start vertex to all other vertices as Infinity
    for (const vertex in graph) {
        distances[vertex] = Infinity;
    }
    distances[start] = 0;

    // Add start vertex to priority queue
    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
        const { element: currentVertex, priority: currentDistance } = pq.dequeue();

        // If vertex is not visited
        if (!visited.has(currentVertex)) {
            visited.add(currentVertex);

            // Update distances of adjacent vertices
            for (const neighbor in graph[currentVertex]) {
                const weight = graph[currentVertex][neighbor];
                const totalDistance = currentDistance + weight;
                if (totalDistance < distances[neighbor]) {
                    distances[neighbor] = totalDistance;
                    pq.enqueue(neighbor, totalDistance);
                }
            }
        }
    }

    return distances;
}

// Priority Queue implementation
class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    enqueue(element, priority) {
        this.elements.push({ element, priority });
        this.elements.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.elements.shift();
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}

// Example usage
const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
};

console.log(dijkstra(graph, 'A')); // Output: { A: 0, B: 4, C: 2, D: 5 }
