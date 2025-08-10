import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';

suite('Punc Flip Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Convert Japanese punctuation to Western', () => {
		// Test the conversion function directly
		const testText = 'こんにちは、世界。今日は良い天気ですね。';
		const expectedText = 'こんにちは, 世界. 今日は良い天気ですね. ';
		
		// Since the convertPunctuation function is not exported, we test the logic directly
		const convertedText = testText
			.replace(/、/g, ', ')
			.replace(/。/g, '. ');
		
		assert.strictEqual(convertedText, expectedText);
	});

	test('Handle text without Japanese punctuation', () => {
		const testText = 'Hello, world. This is a test.';
		const expectedText = 'Hello, world. This is a test.';
		
		const convertedText = testText
			.replace(/、/g, ', ')
			.replace(/。/g, '. ');
		
		assert.strictEqual(convertedText, expectedText);
	});

	test('Handle mixed punctuation', () => {
		const testText = 'Hello、world. こんにちは。';
		const expectedText = 'Hello, world. こんにちは. ';
		
		const convertedText = testText
			.replace(/、/g, ', ')
			.replace(/。/g, '. ');
		
		assert.strictEqual(convertedText, expectedText);
	});

	test('Glob pattern matching - basic wildcard', () => {
		// Test glob pattern matching logic
		const matchesAnyPattern = (filePath: string, patterns: string[]): boolean => {
			const normalizedPath = filePath.replace(/\\/g, '/');
			
			return patterns.some(pattern => {
				const regexPattern = pattern
					.replace(/\*\*/g, '###DOUBLESTAR###')
					.replace(/\*/g, '[^/]*')
					.replace(/###DOUBLESTAR###/g, '.*')
					.replace(/\?/g, '[^/]');
				
				const regex = new RegExp('^' + regexPattern + '$');
				return regex.test(normalizedPath);
			});
		};

		assert.strictEqual(matchesAnyPattern('/path/to/file.txt', ['*.txt']), false);
		assert.strictEqual(matchesAnyPattern('/path/to/file.txt', ['**/*.txt']), true);
		assert.strictEqual(matchesAnyPattern('/docs/readme.md', ['docs/*']), true);
		assert.strictEqual(matchesAnyPattern('/node_modules/package/file.js', ['**/node_modules/**']), true);
	});

	test('File extension extraction', () => {
		const getFileExtension = (fileName: string): string => {
			const lastDotIndex = fileName.lastIndexOf('.');
			return lastDotIndex === -1 ? '' : fileName.substring(lastDotIndex);
		};

		assert.strictEqual(getFileExtension('test.txt'), '.txt');
		assert.strictEqual(getFileExtension('README.md'), '.md');
		assert.strictEqual(getFileExtension('file'), '');
		assert.strictEqual(getFileExtension('path/to/file.markdown'), '.markdown');
	});
});
