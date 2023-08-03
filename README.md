# ShimmerShards - A Reactive React State Management Library

![Shimmer Shards Logo](https://github.com/qusenazlas/shimmer-shards/blob/main/assets/v2.png?raw=true "Logo")

[![Size](https://img.shields.io/bundlephobia/minzip/shimmershards@latest?label=gzip&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/package/shimmershards) [![Version](https://img.shields.io/npm/v/shimmershards?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/shimmershards)

## What is ShimmerShards?

ShimmerShards is a powerful reactive React state management library designed to facilitate effortless sharing of states across the app while providing an excellent developer experience and full Typescript support.

**Learn more about ShimmerShards**: [shimmershards.dev](https://shimmershards.dev)

## Get Started

### Installation

**NPM**

```bash
npm i shimmershards
```

**Yarn**

```bash
yarn add shimmershards
```

**PNPM**

```bash
pnpm add shimmershards
```

### How to use?

#### Create a shard

In ShimmerShards, creating a shard is a simple process using the `shard` function. A shard represents a piece of state that you can use similarly to the regular `useState` hook in React.

```tsx
import { shard, useShard } from "shimmershards";

const counterShard = shard(0);

const Component = () => {
  const [counter, setCounter] = useShard(counterShard);

  return <div>{counter}</div>;
};
```

If you want to share the state across the app, you can export the shard.

```tsx
import { shard, useShard } from "shimmershards";

export const counterShard = shard(0);
```

Now you can import and use it in other components.

```tsx
import { counterShard } from "../dir";
import { useShard } from "shimmershards";

const ComponentB = () => {
  const [counter, setCounter] = useShard(counterShard);

  return <div>{counter}</div>;
};
```

When the state is updated in one place, all components using that shard will be in sync.

#### Create a Cluster

A cluster is a way to group multiple shards together. It provides a mechanism to manage related state pieces collectively.

```tsx
import { shard, useCluster } from "shimmershards";
const nameShard = shard("John");
const ageShard = shard(18);
const cluster = {
  useName: nameShard,
  useAge: ageShard,
};

const Component = () => {
  const { useName, useAge } = useCluster(cluster);
  const [name, setName] = useName();
  const [age, setAge] = useAge();

  return (
    <div>
      name: {name} age: {age}
    </div>
  );
};
```

You can also export the cluster object to use it in different components as shown in the Shard example above.

### Scoped State Management with "Scope" in ShimmerShards

ShimmerShards provides a powerful feature called "Scope" that allows you to localize shard states to specific sections of your application. By wrapping components with the Scope component, you can separate shard states, ensuring that updates in one scope do not affect others, even if the same shard is used.

```tsx
import { Scope, shard, useShard } from "shimmershards";

// Create two shards, one for name and one for age
const nameShard = shard("John");
const ageShard = shard(18);

// Child component that uses the name and age shards
const Child = () => {
  const [age, setAge] = useShard(ageShard);
  const [name, setName] = useShard(nameShard);

  return (
    <div>
      age: {age}
      name: {name}
      <button onClick={() => setAge((prev) => prev + 1)}>increase age</button>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
};

const Component = () => {
  const [age, setAge] = useShard(ageShard);
  const [name, setName] = useShard(nameShard);

  return (
    <div>
      {/* Outside scope */}
      <p>
        age: {age}
        name: {name}
      </p>
      <br />
      <Scope shards={[nameShard, ageShard]}>
        {/* Scope A */}
        <Child />
      </Scope>
      <br />
      <Scope shards={[nameShard, ageShard]}>
        {/* Scope B */}
        <Child />
      </Scope>
    </div>
  );
};
```

With the Scope component, you can manage shard states independently within different sections of your application. Any updates to the state within one scope will not impact the state in other scopes or the outside scope, even if you are using the same shards.

##### But wait! Also working with cluster too.

```tsx
import { Scope, shard, useCluster } from "shimmershards";

// Create two shards, one for name and one for age
const nameShard = shard("John");
const ageShard = shard(18);

// Create a cluster with the name and age shards
const cluster = {
  useName: nameShard,
  useAge: ageShard,
};

// Child component that uses the cluster
const Child = () => {
  const { useName, useAge } = useCluster(cluster);
  const [age, setAge] = useAge();
  const [name, setName] = useName();

  return (
    <div>
      age: {age}
      name: {name}
      <button onClick={() => setAge((prev) => prev + 1)}>increase age</button>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
};

const Component = () => {
  const { useName, useAge } = useCluster(cluster);
  const [age, setAge] = useAge();
  const [name, setName] = useName();

  return (
    <div>
      {/* Outside scope */}
      <p>
        age: {age}
        name: {name}
      </p>
      <br />
      <Scope shards={cluster}>
        {/* Scope A */}
        <Child />
      </Scope>
      <br />
      <Scope shards={cluster}>
        {/* Scope B */}
        <Child />
      </Scope>
    </div>
  );
};
```

<br></br>
ShimmerShards offers a seamless and efficient solution for managing and sharing state in your React applications. Its simplicity and full TypeScript support make it a top-notch choice for state management in your projects.

### Persistence

ShimmerShard allows you to persist data without worries about losing data. We'll be keeping the all data that you want. Just keep it there!

#### Create a persistence shard

The way to create a persistence shard is just like a normal `shard` but we use `persist` instead of `shard`.

```tsx
import { persist } from "shimmershards";
const examplePersistShard = persist({
  initialValue: 0,
  // localStorage's key
  key: "key",
  // optional
  fallback: 2,
});
```

To consume the persistance shard you need to use `usePersistShard` instead of`useShard`.

```tsx
import { persist, usePersistShard } from "shimmershards";

const examplePersistShard = persist({
  initialValue: 0,
  // localStorage's key
  key: "key",
  // optional
  fallback: 2,
});

const Component = () => {
  const [counter, setCounter] = usePersistShard(examplePersistShard);
  return <div>...</div>;
};
```

State sharing still uses the same approach as `shard`.
Persistence shard is compatible with `Cluster` also.

#### Caveats:

The persistence shard will not able be to `Scope`.

#### Key Highlights:

- Easy State Management: With ShimmerShards' shard function, creating and using shards as state variables is straightforward, similar to the useState hook in React.

- Scoped State Management: The Scope component allows you to create isolated scopes for state management, ensuring that state updates within a scope do not affect others.

- Cluster Support: ShimmerShards supports clustering related shards together, providing a structured approach to manage and share grouped states.

<br/>

Check out the documentation at [shimmershards.dev](https://shimmershards.dev) to explore more features and examples.

Feel free to contribute, report issues, or suggest improvements. Happy coding! 🚀
