import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	// Create output channel for logging
	const outputChannel = vscode.window.createOutputChannel('Punc Flip');
	
	// Determine if we're in development mode
	const isDevelopment = context.extensionMode === vscode.ExtensionMode.Development;

	const activationMessage = '=== Punc Flip Extension Activated ===';
	console.log(activationMessage);
	outputChannel.appendLine(activationMessage);
	
	// Show initial configuration in development mode
	if (isDevelopment) {
		const initialConfig = vscode.workspace.getConfiguration('punc-flip');
		const initialSettings = {
			convertOnSave: initialConfig.get('convertOnSave'),
			commaReplacement: initialConfig.get('commaReplacement'),
			periodReplacement: initialConfig.get('periodReplacement'),
			fileExtensions: initialConfig.get('fileExtensions')
		};
		
		outputChannel.appendLine('=== Extension Activated (Development Mode) ===');
		outputChannel.appendLine('Initial Settings:');
		outputChannel.appendLine(JSON.stringify(initialSettings, null, 2));
		outputChannel.show();
	}

	// Command to convert Japanese punctuation to Western punctuation for selected text
	const convertSelectionDisposable = vscode.commands.registerCommand('punc-flip.convertSelection', async () => {
		try {
			const editor = vscode.window.activeTextEditor;
			
			if (!editor) {
				vscode.window.showErrorMessage('No active text editor found.');
				return;
			}

			const selection = editor.selection;
			const text = editor.document.getText(selection);
			
			if (text.length === 0) {
				vscode.window.showWarningMessage('No text selected. Please select text to convert.');
				return;
			}

			const config = vscode.workspace.getConfiguration('punc-flip');
			const convertedText = convertPunctuation(text, config);
			
			// Check if any conversion was made
			if (text === convertedText) {
				vscode.window.showInformationMessage('No Japanese punctuation found in selection.');
				return;
			}
			
			const success = await editor.edit(editBuilder => {
				editBuilder.replace(selection, convertedText);
			});

			if (success) {
				vscode.window.showInformationMessage('Japanese punctuation converted to Western punctuation!');
				outputChannel.appendLine(`Selection converted successfully in ${editor.document.fileName}`);
			} else {
				vscode.window.showErrorMessage('Failed to apply conversion changes.');
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Unknown error';
			vscode.window.showErrorMessage(`Conversion failed: ${errorMessage}`);
			outputChannel.appendLine(`Error in convertSelection: ${errorMessage}`);
		}
	});

	// Command to convert Japanese punctuation to Western punctuation for entire document
	const convertDocumentDisposable = vscode.commands.registerCommand('punc-flip.convertDocument', async () => {
		try {
			const editor = vscode.window.activeTextEditor;
			
			if (!editor) {
				vscode.window.showErrorMessage('No active text editor found.');
				return;
			}

			const document = editor.document;
			const text = document.getText();
			const config = vscode.workspace.getConfiguration('punc-flip');
			const convertedText = convertPunctuation(text, config);
			
			// Check if any conversion was made
			if (text === convertedText) {
				vscode.window.showInformationMessage('No Japanese punctuation found in document.');
				return;
			}
			
			const fullRange = new vscode.Range(
				document.positionAt(0),
				document.positionAt(text.length)
			);
			
			const success = await editor.edit(editBuilder => {
				editBuilder.replace(fullRange, convertedText);
			});

			if (success) {
				vscode.window.showInformationMessage('Entire document converted from Japanese to Western punctuation!');
				outputChannel.appendLine(`Document converted successfully: ${document.fileName}`);
			} else {
				vscode.window.showErrorMessage('Failed to apply conversion changes to document.');
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Unknown error';
			vscode.window.showErrorMessage(`Document conversion failed: ${errorMessage}`);
			outputChannel.appendLine(`Error in convertDocument: ${errorMessage}`);
		}
	});

	// Debug command to show current settings
	const showSettingsDisposable = vscode.commands.registerCommand('punc-flip.showSettings', () => {
		const config = vscode.workspace.getConfiguration('punc-flip');
		const settings = {
			convertOnSave: config.get('convertOnSave'),
			commaReplacement: config.get('commaReplacement'),
			periodReplacement: config.get('periodReplacement'),
			fileExtensions: config.get('fileExtensions'),
			enableForLanguages: config.get('enableForLanguages')
		};
		
		outputChannel.appendLine('=== Current Extension Settings ===');
		outputChannel.appendLine(JSON.stringify(settings, null, 2));
		outputChannel.show();
		
		const message = `Settings:\n${JSON.stringify(settings, null, 2)}`;
		vscode.window.showInformationMessage(
			'Settings displayed in output channel',
			'Show Output Channel'
		).then(selection => {
			if (selection === 'Show Output Channel') {
				outputChannel.show();
			}
		});
	});

	// Command to manually reload settings
	const reloadSettingsDisposable = vscode.commands.registerCommand('punc-flip.reloadSettings', () => {
		const config = vscode.workspace.getConfiguration('punc-flip');
		const convertOnSave = config.get<boolean>('convertOnSave', false);
		
		vscode.window.showInformationMessage(
			`Settings reloaded successfully!\nAuto-convert on save: ${convertOnSave ? 'Enabled' : 'Disabled'}`
		);
	});

	// Command to show output channel
	const showOutputDisposable = vscode.commands.registerCommand('punc-flip.showOutput', () => {
		outputChannel.show();
		outputChannel.appendLine('=== Output Channel Opened ===');
		outputChannel.appendLine(`Current time: ${new Date().toLocaleString()}`);
		vscode.window.showInformationMessage('Extension output channel is now visible!');
	});

	// Auto-convert on save functionality
	const onSaveDisposable = vscode.workspace.onWillSaveTextDocument(async (event) => {
		try {
			const config = vscode.workspace.getConfiguration('punc-flip');
			const convertOnSave = config.get<boolean>('convertOnSave', false);
			
			outputChannel.appendLine(`=== File Save Event ===`);
			outputChannel.appendLine(`File: ${event.document.fileName}`);
			outputChannel.appendLine(`Convert on Save: ${convertOnSave}`);
			
			if (!convertOnSave) {
				outputChannel.appendLine('Auto-convert is disabled, skipping...');
				return;
			}

			const document = event.document;
			
			// Check if the file should be converted based on various criteria
			const shouldConvert = shouldConvertFile(document, config);
			outputChannel.appendLine(`Should convert file: ${shouldConvert}`);
			
			if (!shouldConvert) {
				outputChannel.appendLine('File does not match conversion criteria, skipping...');
				return;
			}

			const text = document.getText();
			const convertedText = convertPunctuation(text, config);
			
			// Only apply changes if there are actual conversions to be made
			if (text !== convertedText) {
				outputChannel.appendLine('Japanese punctuation found, converting...');
				const fullRange = new vscode.Range(
					document.positionAt(0),
					document.positionAt(text.length)
				);
				
				const edit = new vscode.WorkspaceEdit();
				edit.replace(document.uri, fullRange, convertedText);
				
				event.waitUntil(vscode.workspace.applyEdit(edit));
				outputChannel.appendLine('Conversion applied successfully!');
			} else {
				outputChannel.appendLine('No Japanese punctuation found, no changes made.');
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Unknown error';
			outputChannel.appendLine(`Error in onWillSaveTextDocument: ${errorMessage}`);
			console.error('Auto-convert on save failed:', error);
		}
	});

	// Listen for configuration changes
	const configChangeDisposable = vscode.workspace.onDidChangeConfiguration(event => {
		if (event.affectsConfiguration('punc-flip')) {
			const config = vscode.workspace.getConfiguration('punc-flip');
			const newSettings = {
				convertOnSave: config.get('convertOnSave'),
				commaReplacement: config.get('commaReplacement'),
				periodReplacement: config.get('periodReplacement')
			};
			
			outputChannel.appendLine('=== Configuration Changed ===');
			outputChannel.appendLine(JSON.stringify(newSettings, null, 2));
			
			if (config.get<boolean>('convertOnSave', false)) {
				vscode.window.showInformationMessage('Punc Flip: Auto-convert on save is now enabled!');
			}
		}
	});

	context.subscriptions.push(convertSelectionDisposable);
	context.subscriptions.push(convertDocumentDisposable);
	context.subscriptions.push(showSettingsDisposable);
	context.subscriptions.push(reloadSettingsDisposable);
	context.subscriptions.push(showOutputDisposable);
	context.subscriptions.push(onSaveDisposable);
	context.subscriptions.push(configChangeDisposable);
	context.subscriptions.push(outputChannel);
}

/**
 * Determine if a file should be converted based on configuration settings
 * @param document The text document to check
 * @param config The extension configuration
 * @returns True if the file should be converted
 */
function shouldConvertFile(document: vscode.TextDocument, config: vscode.WorkspaceConfiguration): boolean {
	const fileName = document.fileName;
	const fileExtension = getFileExtension(fileName);
	const languageId = document.languageId;
	
	// Get configuration values
	const fileExtensions = config.get<string[]>('fileExtensions', ['.txt', '.md', '.markdown']);
	const includePatterns = config.get<string[]>('includePatterns', []);
	const excludePatterns = config.get<string[]>('excludePatterns', ['**/node_modules/**', '**/.git/**']);
	const enableForLanguages = config.get<string[]>('enableForLanguages', ['plaintext', 'markdown']);
	
	// Debug logging (only in development mode)
	const isDevelopment = process.env.NODE_ENV === 'development' || vscode.env.sessionId.includes('test');
	
	if (isDevelopment) {
		// Use existing output channel for debug info to avoid creating multiple channels
		const outputChannel = vscode.window.createOutputChannel('Punc Flip');
		outputChannel.appendLine(`=== File Check Debug ===`);
		outputChannel.appendLine(`File name: ${fileName}`);
		outputChannel.appendLine(`File extension: ${fileExtension}`);
		outputChannel.appendLine(`Language ID: ${languageId}`);
		outputChannel.appendLine(`Configured extensions: ${JSON.stringify(fileExtensions)}`);
		outputChannel.appendLine(`Configured languages: ${JSON.stringify(enableForLanguages)}`);
		outputChannel.appendLine(`Include patterns: ${JSON.stringify(includePatterns)}`);
		outputChannel.appendLine(`Exclude patterns: ${JSON.stringify(excludePatterns)}`);
		
		// Check exclude patterns first (highest priority)
		if (excludePatterns.length > 0 && matchesAnyPattern(fileName, excludePatterns)) {
			outputChannel.appendLine(`❌ File excluded by exclude patterns`);
			return false;
		}
		
		// Check include patterns (if specified, they take precedence over other criteria)
		if (includePatterns.length > 0) {
			const matches = matchesAnyPattern(fileName, includePatterns);
			outputChannel.appendLine(`Include patterns check: ${matches}`);
			return matches;
		}
		
		// Check language ID
		if (enableForLanguages.includes(languageId)) {
			outputChannel.appendLine(`✅ File matches language ID: ${languageId}`);
			return true;
		}
		
		// Check file extension
		if (fileExtensions.includes(fileExtension)) {
			outputChannel.appendLine(`✅ File matches extension: ${fileExtension}`);
			return true;
		}
		
		outputChannel.appendLine(`❌ File does not match any criteria`);
		return false;
	}
	
	// Production mode: no debug logging, optimized checks
	if (excludePatterns.length > 0 && matchesAnyPattern(fileName, excludePatterns)) {
		return false;
	}
	
	if (includePatterns.length > 0) {
		return matchesAnyPattern(fileName, includePatterns);
	}
	
	if (enableForLanguages.includes(languageId)) {
		return true;
	}
	
	return fileExtensions.includes(fileExtension);
}

/**
 * Check if a file path matches any of the given glob patterns
 * @param filePath The file path to check
 * @param patterns Array of glob patterns
 * @returns True if the file matches any pattern
 */
function matchesAnyPattern(filePath: string, patterns: string[]): boolean {
	if (patterns.length === 0) return false;
	
	const normalizedPath = filePath.replace(/\\/g, '/');
	
	return patterns.some(pattern => {
		// Cache regex patterns for better performance if needed in the future
		const regexPattern = pattern
			.replace(/\*\*/g, '###DOUBLESTAR###')
			.replace(/\*/g, '[^/]*')
			.replace(/###DOUBLESTAR###/g, '.*')
			.replace(/\?/g, '[^/]');
		
		const regex = new RegExp('^' + regexPattern + '$');
		return regex.test(normalizedPath);
	});
}

/**
 * Convert Japanese punctuation marks to Western punctuation marks
 * @param text The input text containing Japanese punctuation
 * @param config The extension configuration
 * @returns Text with Western punctuation
 */
function convertPunctuation(text: string, config?: vscode.WorkspaceConfiguration): string {
	// Early return if no Japanese punctuation is found (performance optimization)
	if (!text.includes('、') && !text.includes('。')) {
		return text;
	}
	
	// Get configuration or use defaults
	const commaReplacement = config?.get<string>('commaReplacement', '，') || '，';
	const periodReplacement = config?.get<string>('periodReplacement', '．') || '．';
	
	return text
		.replace(/、/g, commaReplacement)  // Japanese comma replacement
		.replace(/。/g, periodReplacement); // Japanese period replacement
}

/**
 * Get file extension from filename
 * @param fileName The full filename
 * @returns The file extension including the dot (e.g., '.txt')
 */
function getFileExtension(fileName: string): string {
	const lastDotIndex = fileName.lastIndexOf('.');
	return lastDotIndex === -1 ? '' : fileName.substring(lastDotIndex);
}

// This method is called when your extension is deactivated
export function deactivate() {}
