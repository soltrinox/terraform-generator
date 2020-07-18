import { Resource, Output, Provisioner } from '../../src';

test('Block identifier', () => {
  expect(() => new Resource('!@#', '$%^')).toThrow();
  expect(() => new Resource('', ' ')).toThrow();
  expect(() => new Output(null)).toThrow();
});

test('Block arguments', () => {
  const resource = new Resource('type', 'name');
  expect(resource.getArguments()).toMatchSnapshot();
  expect(resource.setArgument('a', 1).getArguments()).toMatchSnapshot();
  expect(resource.setArguments({
    a: 0,
    b: 1,
    c: 2
  }).getArguments()).toMatchSnapshot();
  expect(resource.deleteArgument('b').getArguments()).toMatchSnapshot();
  expect(resource.setProvisioners([
    new Provisioner('p1', { a: 0 }),
    new Provisioner('p2', { b: 1 })
  ]).getProvisioners()).toMatchSnapshot();
  expect(resource.setProvisioners(null).getProvisioners()).toMatchSnapshot();
});
