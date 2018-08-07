import * as React from 'react';
import { Todo } from '../types/CommonTypes';

/**
 * データの変換にはいくつか種類がある
 * 1. データ構造の変換 => コンテナなどで扱うのが良い
 * 2. 表示形式変換 => 実際に表示するコンポーネントで扱うのが良い
 *
 * ここでは、id, title を元に表示形式を加工している。
 * 以下のように書くこともできるが、この変換は TodoItem に閉じ込めるのが良い
 * @example
 * <TodoItem label={`${id}: ${title}`} />
 */
export const TodoItem = ({ id, title }: Todo) => (
  <div>
    {id}: {title}
  </div>
);
