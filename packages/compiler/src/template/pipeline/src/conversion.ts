/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as o from '../../../output/output_ast';
import * as ir from '../ir';

export const BINARY_OPERATORS = new Map([
  ['&&', o.BinaryOperator.And],
  ['>', o.BinaryOperator.Bigger],
  ['>=', o.BinaryOperator.BiggerEquals],
  ['&', o.BinaryOperator.BitwiseAnd],
  ['/', o.BinaryOperator.Divide],
  ['==', o.BinaryOperator.Equals],
  ['===', o.BinaryOperator.Identical],
  ['<', o.BinaryOperator.Lower],
  ['<=', o.BinaryOperator.LowerEquals],
  ['-', o.BinaryOperator.Minus],
  ['%', o.BinaryOperator.Modulo],
  ['*', o.BinaryOperator.Multiply],
  ['!=', o.BinaryOperator.NotEquals],
  ['!==', o.BinaryOperator.NotIdentical],
  ['??', o.BinaryOperator.NullishCoalesce],
  ['||', o.BinaryOperator.Or],
  ['+', o.BinaryOperator.Plus],
]);

export const NAMESPACES = new Map([['svg', ir.Namespace.SVG], ['math', ir.Namespace.Math]]);

export function namespaceForKey(namespacePrefixKey: string|null): ir.Namespace {
  if (namespacePrefixKey === null) {
    return ir.Namespace.HTML;
  }
  return NAMESPACES.get(namespacePrefixKey) ?? ir.Namespace.HTML;
}

export function keyForNamespace(namespace: ir.Namespace): string|null {
  for (const [k, n] of NAMESPACES.entries()) {
    if (n === namespace) {
      return k;
    }
  }
  return null;  // No namespace prefix for HTML
}

export function prefixWithNamespace(strippedTag: string, namespace: ir.Namespace): string {
  if (namespace === ir.Namespace.HTML) {
    return strippedTag;
  }
  return `:${keyForNamespace(namespace)}:${strippedTag}`;
}

export function literalOrArrayLiteral(value: any): o.Expression {
  if (Array.isArray(value)) {
    return o.literalArr(value.map(literalOrArrayLiteral));
  }
  return o.literal(value, o.INFERRED_TYPE);
}
