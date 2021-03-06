import { attr } from '..';
import { Argument, arg } from '../../src';
import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';

test('Argument invalid args', () => {
  expect(() => new Argument(null)).toThrow();
});

test('Argument', () => {
  expect(new Argument('x').toTerraform()).toBe(TerraformGeneratorUtils.escape('x'));
  expect(new Argument(attr).toTerraform()).toBe(TerraformGeneratorUtils.escape('type.name.attr'));
});

test('arg', () => {
  expect(arg('x').toTerraform()).toBe(TerraformGeneratorUtils.escape('x'));
  expect(arg(attr).toTerraform()).toBe(TerraformGeneratorUtils.escape('type.name.attr'));
});

test('.attr', () => {
  expect(arg('x').attr('y').toTerraform()).toBe(TerraformGeneratorUtils.escape('x.y'));
  expect(arg(attr).attr('y').toTerraform()).toBe(TerraformGeneratorUtils.escape('type.name.attr.y'));
});

test('.element', () => {
  expect(arg('x').element(0).toTerraform()).toBe(TerraformGeneratorUtils.escape('x[0]'));
  expect(arg(attr).element(0).toTerraform()).toBe(TerraformGeneratorUtils.escape('type.name.attr[0]'));
});

test('interpolation', () => {
  expect(`prefix-${arg('x')}-suffix`).toBe(TerraformGeneratorUtils.escape('prefix-${x}-suffix'));
  expect(`prefix-${arg(attr)}-suffix`).toBe(TerraformGeneratorUtils.escape('prefix-${type.name.attr}-suffix'));
});
