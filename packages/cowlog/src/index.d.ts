declare module 'cowlog' {
  class Jimple {
    /**
     * Create a Jimple Container.
     * @param [values] - An optional object whose keys and values will be associated in the container at initialization
     */
    constructor(values?: object);

    static provider(register: any): object;

    /**
     * Return the specified parameter or service. If the service is not built yet, this function will construct the service
     * injecting all the dependencies needed in it's definition so the returned object is totally usable on the fly.
     * @param key - The key of the parameter or service to return
     * @return The object related to the service or the value of the parameter associated with the key informed
     * @throws If the key does not exist
     */
    get(key: string): any;

    /**
     * Defines a new parameter or service.
     * @param key - The key of the parameter or service to be defined
     * @param value - The value of the parameter or a function that receives the container as parameter and constructs the service
     */
    set(key: string, value: any): void;

    /**
     * Returns if a service or parameter with the informed key is already defined in the container.
     * @param key - The key of the parameter or service to be checked.
     * @return If the key exists in the container or not
     */
    has(key: string): boolean;

    /**
     * Defines a service as a factory, so the instances are not cached in the service and that function is always called
     * @param fn - The function that constructs the service that is a factory
     * @return The same function passed as parameter
     */
    factory<T extends Function>(fn: T): T;

    /**
     * Defines a function as a parameter, so that function is not considered a service
     * @param fn - The function to not be considered a service
     * @return The same function passed as parameter
     */
    protect<T extends Function>(fn: T): T;

    /**
     * Return all the keys registered in the container
     */
    keys(): string[];

    /**
     * Extends a service already registered in the container
     * @param key - The key of the service to be extended
     * @param fn - The function that will be used to extend the service
     * @throws If the key is not already defined
     * @throws If the key saved in the container does not correspond to a service
     * @throws If the function passed it not...well, a function
     */
    extend(key: string, fn: Function): void;

    /**
     * Uses an provider to extend the service, so it's easy to split the service and parameter definitions across the system
     * @param provider - The provider to be used to register services and parameters in this container
     */
    register(provider: { register: Function}): void;

    /**
     * Returns the raw value of a service or parameter. So, in the case of a service, for example, the value returned is the
     * function used to construct the service.
     * @param key - The key of the service or parameter to return.
     * @throws If the key does not exist in the container
     * @return The raw value of the service or parameter
     */
    raw(key: string): any;
  }
  export default function l(...params: any): Jimple;
}
