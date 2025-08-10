# Punc Flip

日本語の句読点を任意のスタイルに変換するVisual Studio Code拡張機能です。

[English](./README.md) | 日本語

## 機能

この拡張機能は、柔軟な置換パターンで日本語の句読点を変換できます：

- **日本語のカンマ（、）** → 設定可能な置換（デフォルト: **，** 全角カンマ）
- **日本語の句点（。）** → 設定可能な置換（デフォルト: **．** 全角ピリオド）
- **保存時自動変換** - ファイル保存時に自動的に句読点を変換
- **カスタマイズ可能な置換パターン** - 複数の句読点スタイルから選択可能
- **日本語学術論文に最適** - デフォルトの全角句読点は日本語学術論文の標準に準拠

### 置換オプション

**カンマ（、）の置換:**
- **`，`** (全角カンマ) - **デフォルト、日本語学術論文に推奨**
- **`, `** (半角カンマ + スペース) - 欧米スタイル
- **`,`** (半角カンマのみ) - コンパクトスタイル

**句点（。）の置換:**
- **`．`** (全角ピリオド) - **デフォルト、日本語学術論文に推奨**
- **`. `** (半角ピリオド + スペース) - 欧米スタイル
- **`.`** (半角ピリオドのみ) - コンパクトスタイル

### コマンド

- `Convert Selected Japanese Punctuation` - 選択テキストの句読点を現在の設定で変換
- `Convert Document Japanese Punctuation` - ドキュメント全体の句読点を現在の設定で変換
- `Convert Japanese Punctuation (Smart)` - テキスト選択がある場合は選択部分、ない場合は全体を変換
- `Show Punc Flip Settings` - 現在の拡張機能設定を表示
- `Show Punc Flip Output` - デバッグ用の出力チャンネルを開く

### 使用方法

1. **スマート変換（推奨）**: 
   - `Ctrl+Shift+J` (Windows/Linux) または `Cmd+Shift+J` (Mac) を使用
   - テキストが選択されている場合は選択部分、されていない場合はドキュメント全体を変換
   - 設定された置換パターンを使用

2. **選択テキストの変換**: 
   - 変換したいテキストを選択
   - 右クリックして「Convert Selected Japanese Punctuation」をコンテキストメニューから選択
   - またはコマンドパレット（`Ctrl+Shift+P`）で「Convert Selected Japanese Punctuation」を検索

3. **ドキュメント全体の変換**: 
   - コマンドパレット（`Ctrl+Shift+P`）で「Convert Document Japanese Punctuation」を検索

4. **保存時自動変換**:
   - 設定で有効化: `"punc-flip.convertOnSave": true`
   - 置換パターンを設定: `"punc-flip.commaReplacement"` と `"punc-flip.periodReplacement"`
   - ファイル保存時に自動的に日本語句読点を変換
   - デフォルトで.txt、.md、.markdownファイルに対応
   - 拡張子やパターンは設定でカスタマイズ可能

### 変換例

**元の日本語テキスト:**
```
こんにちは、世界。今日は良い天気ですね。
```

**変換後（デフォルト - 全角）:**
```
こんにちは，世界．今日は良い天気ですね．
```

**変換後（欧米スタイル）:**
```
こんにちは, 世界. 今日は良い天気ですね. 
```

**変換後（コンパクトスタイル）:**
```
こんにちは,世界.今日は良い天気ですね.
```

## 動作要件

- Visual Studio Code バージョン1.97.0以上

## 設定オプション

- `punc-flip.convertOnSave`: ファイル保存時の自動変換を有効/無効にする（デフォルト: false）
- `punc-flip.commaReplacement`: 日本語カンマ（、）の置換文字（デフォルト: "，"）
  - オプション: `"，"` (全角)、`", "` (半角 + スペース)、`","` (半角のみ)
- `punc-flip.periodReplacement`: 日本語句点（。）の置換文字（デフォルト: "．"）
  - オプション: `"．"` (全角)、`". "` (半角 + スペース)、`"."` (半角のみ)
- `punc-flip.fileExtensions`: 自動変換を適用するファイル拡張子の配列（デフォルト: [".txt", ".md", ".markdown", ".tex"]）
- `punc-flip.includePatterns`: 自動変換に含めるファイルのGlobパターン（例: "**/*.txt", "docs/**"）
- `punc-flip.excludePatterns`: 自動変換から除外するファイルのGlobパターン（デフォルト: ["**/node_modules/**", "**/.git/**"]）
- `punc-flip.enableForLanguages`: 自動変換を有効にする言語ID（デフォルト: ["plaintext", "markdown"]）

### 保存時自動変換の有効化方法

1. VS Code設定を開く（`Ctrl+,` または `ファイル > 基本設定 > 設定`）
2. "punc-flip"で検索
3. 「Convert On Save」オプションをチェック
4. 必要に応じて、以下のオプションでターゲットファイルをカスタマイズ：

#### 方法1: 設定UI使用（推奨）

1. **設定を開く**:
   - `Ctrl+,` (Windows/Linux) または `Cmd+,` (Mac) を押す
   - または `ファイル > 基本設定 > 設定` に移動

2. **拡張機能設定を検索**:
   - 検索ボックスに「**punc-flip**」と入力
   - すべての拡張機能設定が表示されます

3. **設定を構成**:
   - **Convert On Save**: 自動変換を有効にするためチェック
   - **Comma Replacement**: 日本語カンマ（、）の置換パターンを選択
   - **Period Replacement**: 日本語句点（。）の置換パターンを選択
   - **File Extensions**: ファイル拡張子を追加/削除（例: ".txt", ".md", ".tex"）
   - **Include Patterns**: 含めるファイルパターンを指定
   - **Exclude Patterns**: 除外するファイルパターンを指定
   - **Enable For Languages**: 言語タイプを選択

#### 方法2: settings.jsonを直接編集

1. **コマンドパレットを開く**: `Ctrl+Shift+P` (Windows/Linux) または `Cmd+Shift+P` (Mac)
2. **検索して選択**: 「基本設定: ユーザー設定を開く (JSON)」
3. **設定を追加**: 以下をsettings.jsonファイルに追加:

```json
{
  "punc-flip.convertOnSave": true,
  "punc-flip.commaReplacement": "，",
  "punc-flip.periodReplacement": "．",
  "punc-flip.fileExtensions": [".txt", ".md", ".markdown", ".tex"],
  "punc-flip.includePatterns": [],
  "punc-flip.excludePatterns": ["**/node_modules/**", "**/.git/**"],
  "punc-flip.enableForLanguages": ["plaintext", "markdown"]
}
```

#### 設定の確認

設定変更後:
1. 対象ファイル（例: `test.txt`）を開く
2. 日本語テキストを入力: `こんにちは、世界。`
3. `Ctrl+S`でファイルを保存
4. テキストが自動的に変換される: `こんにちは，世界．`（デフォルトの全角設定の場合）

**注意**: 設定は変更時に自動的にリロードされます。拡張機能を再起動する必要はありません！

自動変換が動作しない場合:
- 「拡張機能設定をリロード」コマンドを使用: `Ctrl+Shift+P` → 「拡張機能設定をリロード」
- デバッグコンソールでエラーを確認: `Ctrl+Shift+Y`
- Extension Hostを再起動: `Ctrl+Shift+P` → 「開発者: ウィンドウの再読み込み」（最後の手段）

#### ファイル選択の優先順位（順番通り）:
1. **除外パターン**（最高優先度）: これらのパターンにマッチするファイルは変換されません
2. **Include Patterns**: 指定されている場合、これらのパターンが他の条件より優先されます
3. **Enable For Languages**: 指定された言語IDのファイル
4. **File Extensions**: 指定された拡張子のファイル

#### 設定例

**特定のファイルのみ変換:**
```json
{
  "punc-flip.convertOnSave": true,
  "punc-flip.commaReplacement": "，",
  "punc-flip.periodReplacement": "．",
  "punc-flip.includePatterns": [
    "**/docs/**/*.md",
    "**/README.txt",
    "journal/**"
  ]
}
```

**特定のディレクトリを除いてすべてのテキストファイルを変換:**
```json
{
  "punc-flip.convertOnSave": true,
  "punc-flip.commaReplacement": "，",
  "punc-flip.periodReplacement": "．",
  "punc-flip.fileExtensions": [".txt", ".md", ".markdown", ".tex"],
  "punc-flip.excludePatterns": [
    "**/node_modules/**",
    "**/vendor/**",
    "**/backup/**"
  ]
}
```

**言語タイプに基づく変換:**
```json
{
  "punc-flip.convertOnSave": true,
  "punc-flip.commaReplacement": "，",
  "punc-flip.periodReplacement": "．",
  "punc-flip.enableForLanguages": [
    "plaintext",
    "markdown",
    "japanese"
  ]
}
```

**日本語学術論文用の置換パターンをカスタマイズ:**
```json
{
  "punc-flip.convertOnSave": true,
  "punc-flip.commaReplacement": "，",
  "punc-flip.periodReplacement": "．",
  "punc-flip.fileExtensions": [".txt", ".md", ".tex", ".docx"]
}
```

**欧米スタイル（国際文書用）:**
```json
{
  "punc-flip.convertOnSave": true,
  "punc-flip.commaReplacement": ", ",
  "punc-flip.periodReplacement": ". ",
  "punc-flip.fileExtensions": [".txt", ".md", ".markdown", ".tex"]
}
```

**スペースなしのコンパクトスタイル:**
```json
{
  "punc-flip.convertOnSave": true,
  "punc-flip.commaReplacement": ",",
  "punc-flip.periodReplacement": ".",
  "punc-flip.fileExtensions": [".txt", ".md"]
}
```

**利用可能な置換オプション:**
- **カンマの置換**: `", "` (半角 + スペース)、`"，"` (全角)、`","` (半角のみ)
- **句点の置換**: `". "` (半角 + スペース)、`"．"` (全角)、`"."` (半角のみ)

> **注意**: デフォルト設定では日本語学術論文でよく使用される全角句読点（，．）を使用しています。

## 既知の問題

現在のところありません。問題があればGitHubリポジトリで報告してください。

## リリースノート

### 0.0.1

Punc Flipの初期リリース:
- 選択テキストとドキュメント全体の日本語句読点変換
- **カスタマイズ可能な置換パターン**: 全角、半角+スペース、半角のみから選択
- **日本語学術論文サポート**: デフォルトの全角句読点（，．）は日本語学術標準に準拠
- 柔軟なファイルターゲティングによる保存時自動変換:
  - ファイル拡張子フィルタリング
  - Globパターンの包含/除外
  - 言語IDベースのターゲティング
- VS Code設定UIによる包括的な設定オプション
- キーボードショートカット（`Ctrl+Shift+J`）とコンテキストメニュー統合
- トラブルシューティングと設定確認のためのデバッグコマンド

---

**日本語学術論文や多言語文書に最適！**
