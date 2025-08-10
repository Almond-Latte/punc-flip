# Punc Flip

A Visual Studio Code extension that converts Japanese punctuation marks with customizable replacement patterns.

English | [日本語](./README.ja.md)

## Features

This extension provides flexible conversion of Japanese punctuation with customizable replacement patterns:

- **Japanese comma (、)** → Configurable replacement (default: **，** full-width comma)
- **Japanese period (。)** → Configurable replacement (default: **．** full-width period)
- **Auto-convert on save** - Automatically convert punctuation when saving files
- **Customizable replacement patterns** - Choose from multiple punctuation styles
- **Perfect for Japanese academic papers** - Default full-width punctuation follows Japanese academic writing standards

### Replacement Options

**Comma (、) Replacement:**
- **`，`** (full-width comma) - **Default, recommended for Japanese academic writing**
- **`, `** (half-width comma + space) - Western style
- **`,`** (half-width comma only) - Compact style

**Period (。) Replacement:**
- **`．`** (full-width period) - **Default, recommended for Japanese academic writing**
- **`. `** (half-width period + space) - Western style
- **`.`** (half-width period only) - Compact style

### Commands

- `Convert Selected Japanese Punctuation` - Converts punctuation in selected text using current settings
- `Convert Document Japanese Punctuation` - Converts punctuation in entire document using current settings
- `Convert Japanese Punctuation (Smart)` - Converts selection if text is selected, otherwise converts entire document
- `Show Punc Flip Settings` - Display current extension configuration
- `Show Punc Flip Output` - Open extension output channel for debugging

### Usage

1. **Smart Convert (Recommended)**: 
   - Use `Ctrl+Shift+J` (Windows/Linux) or `Cmd+Shift+J` (Mac)
   - Converts selected text if text is selected, otherwise converts entire document
   - Uses your configured replacement patterns

2. **Convert Selected Text**: 
   - Select the text you want to convert
   - Right-click and select "Convert Selected Japanese Punctuation" from the context menu
   - Or use Command Palette (`Ctrl+Shift+P`) and search for "Convert Selected Japanese Punctuation"

3. **Convert Entire Document**: 
   - Open Command Palette (`Ctrl+Shift+P`) and search for "Convert Document Japanese Punctuation"

4. **Auto-convert on Save**:
   - Enable in settings: `"punc-flip.convertOnSave": true`
   - Configure replacement patterns: `"punc-flip.commaReplacement"` and `"punc-flip.periodReplacement"`
   - Automatically converts Japanese punctuation when you save files
   - Works with .txt, .md, and .markdown files by default
   - Customize file extensions and patterns in settings

### Before and After Example

**Original Japanese Text:**
```
こんにちは、世界。今日は良い天気ですね。
```

**After Conversion (Default - Full-width):**
```
こんにちは，世界．今日は良い天気ですね．
```

**After Conversion (Western style with spaces):**
```
こんにちは, 世界. 今日は良い天気ですね. 
```

**After Conversion (Compact style):**
```
こんにちは,世界.今日は良い天気ですね.
```

## Requirements

- Visual Studio Code version 1.97.0 or higher

## Extension Settings

This extension contributes the following settings:

- `punc-flip.convertOnSave`: Enable/disable automatic conversion of Japanese punctuation when saving files (default: false)
## Configuration Options

- `punc-flip.convertOnSave`: Enable/disable automatic conversion on file save (default: false)
- `punc-flip.commaReplacement`: What to replace Japanese comma (、) with (default: "，")
  - Options: `"，"` (full-width), `", "` (half-width + space), `","` (half-width only)
- `punc-flip.periodReplacement`: What to replace Japanese period (。) with (default: "．")
  - Options: `"．"` (full-width), `". "` (half-width + space), `"."` (half-width only)
- `punc-flip.fileExtensions`: Array of file extensions to apply auto-conversion (default: [".txt", ".md", ".markdown", ".tex"])
- `punc-flip.includePatterns`: Glob patterns for files to include in auto-conversion (e.g., "**/*.txt", "docs/**")
- `punc-flip.excludePatterns`: Glob patterns for files to exclude from auto-conversion (default: ["**/node_modules/**", "**/.git/**"])
- `punc-flip.enableForLanguages`: Language IDs to enable auto-conversion for (default: ["plaintext", "markdown"])

### How to Enable Auto-convert on Save

1. Open VS Code Settings (`Ctrl+,` or `File > Preferences > Settings`)
2. Search for "punc-flip"
3. Check the "Convert On Save" option
4. Optionally, customize the target files using the following options:

#### Method 1: Using Settings UI (Recommended)

1. **Open Settings**:
   - Press `Ctrl+,` (Windows/Linux) or `Cmd+,` (Mac)
   - Or go to `File > Preferences > Settings`

2. **Search for Extension Settings**:
   - Type "**punc-flip**" in the search box
   - All extension settings will appear

3. **Configure Settings**:
   - **Convert On Save**: Check the checkbox to enable auto-conversion
   - **Comma Replacement**: Choose replacement pattern for Japanese comma (、)
   - **Period Replacement**: Choose replacement pattern for Japanese period (。)
   - **File Extensions**: Add/remove file extensions (e.g., ".txt", ".md", ".tex")
   - **Include Patterns**: Specify file patterns to include
   - **Exclude Patterns**: Specify file patterns to exclude
   - **Enable For Languages**: Select language types

#### Method 2: Edit settings.json Directly

1. **Open Command Palette**: `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
2. **Search and Select**: "Preferences: Open User Settings (JSON)"
3. **Add Configuration**: Add the following to your settings.json file:

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

#### Verifying Settings

After changing settings:
1. Open a target file (e.g., `test.txt`)
2. Type Japanese text: `こんにちは、世界。`
3. Save the file with `Ctrl+S`
4. Text should automatically convert to: `こんにちは，世界．` (with default full-width settings)

**Note**: Settings are automatically reloaded when changed. You don't need to restart the extension!

If auto-conversion doesn't work:
- Use the "Reload Extension Settings" command: `Ctrl+Shift+P` → "Reload Extension Settings"
- Check Debug Console for errors: `Ctrl+Shift+Y`
- Restart the Extension Host: `Ctrl+Shift+P` → "Developer: Reload Window" (last resort)

#### File Selection Priority (in order):
1. **Exclude Patterns** (highest priority): Files matching these patterns will never be converted
2. **Include Patterns**: If specified, only files matching these patterns will be converted
3. **Language IDs**: Files with these language identifiers will be converted
4. **File Extensions**: Files with these extensions will be converted

#### Configuration Examples:

**Convert only specific files:**
```json
{
  "punc-flip.convertOnSave": true,
  "punc-flip.includePatterns": [
    "**/docs/**/*.md",
    "**/README.txt",
    "journal/**"
  ]
}
```

**Convert all text files except in certain directories:**
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

**Convert based on language type:**
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

**Customize replacement patterns (perfect for Japanese academic papers):**
```json
{
  "punc-flip.convertOnSave": true,
  "punc-flip.commaReplacement": "，",
  "punc-flip.periodReplacement": "．",
  "punc-flip.fileExtensions": [".txt", ".md", ".tex", ".docx"]
}
```

**Western style with spaces (for international documents):**
```json
{
  "punc-flip.convertOnSave": true,
  "punc-flip.commaReplacement": ", ",
  "punc-flip.periodReplacement": ". ",
  "punc-flip.fileExtensions": [".txt", ".md", ".markdown", ".tex"]
}
```

**Compact style without spaces:**
```json
{
  "punc-flip.convertOnSave": true,
  "punc-flip.commaReplacement": ",",
  "punc-flip.periodReplacement": ".",
  "punc-flip.fileExtensions": [".txt", ".md"]
}
```

**Available replacement options:**
- **Comma replacement**: `", "` (half-width + space), `"，"` (full-width), `","` (half-width only)
- **Period replacement**: `". "` (half-width + space), `"．"` (full-width), `"."` (half-width only)

> **Note**: Default settings use full-width punctuation (，．) which is commonly used in Japanese academic writing.

## Known Issues

None at this time. Please report any issues on the GitHub repository.

## Release Notes

### 0.0.1

Initial release of Punc Flip:
- Convert selected text and entire documents with Japanese punctuation
- **Customizable replacement patterns**: Choose from full-width, half-width+space, or half-width only
- **Japanese academic writing support**: Default full-width punctuation (，．) follows Japanese academic standards
- Auto-convert on save functionality with flexible file targeting:
  - File extension filtering
  - Glob pattern inclusion/exclusion  
  - Language ID-based targeting
- Comprehensive configuration options through VS Code settings UI
- Keyboard shortcuts (`Ctrl+Shift+J`) and context menu integration
- Debug commands for troubleshooting and configuration verification

---

**Perfect for Japanese academic papers and multilingual documents!**
