export function solve_01_runtime_event_loop_visualizer() {
    const steps = [];

    steps.push("Synchronous start (1)");

    setTimeout(() =>{
        steps.push("setTimeout callback(4)");
    }, 0);

    Promise.resolve().then(() =>{
        steps.push("Promise microtask(3)");
    });

    steps.push("Synchronous end(2)");

    return new Promise((resolve) =>{
        setTimeout(() => {
            resolve(steps);
        }, 10);
    });
}
