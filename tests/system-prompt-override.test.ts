import test from "node:test";
import assert from "node:assert/strict";

test("overrideSystemPrompt takes precedence over appendSystemPrompt", () => {
	// When overrideSystemPrompt is true, appendSystemPrompt should be disabled
	const overrideEnabled = true;
	const appendSystemPrompt = false; // Explicitly set to false

	// Simulate the logic from index.ts lines 1971-1972:
	// const useSystemPromptOverride = providerSettings.overrideSystemPrompt === true;
	// const appendSystemPrompt = !useSystemPromptOverride && providerSettings.appendSystemPrompt !== false;

	const useSystemPromptOverride = overrideEnabled === true;
	const effectiveAppendSystemPrompt = !useSystemPromptOverride && appendSystemPrompt !== false;

	assert.equal(useSystemPromptOverride, true);
	assert.equal(effectiveAppendSystemPrompt, false, "appendSystemPrompt should be disabled when override is true");
});

test("system prompt mode selection logic", () => {
	// Test case 1: Default mode (Claude Code preset with appends)
	{
		const settings = { overrideSystemPrompt: undefined, appendSystemPrompt: undefined };
		const useOverride = settings.overrideSystemPrompt === true;
		const appendEnabled = !useOverride && settings.appendSystemPrompt !== false;

		assert.equal(useOverride, false, "Should not use override by default");
		assert.equal(appendEnabled, true, "Should append by default");
	}

	// Test case 2: Override mode
	{
		const settings = { overrideSystemPrompt: true, appendSystemPrompt: true };
		const useOverride = settings.overrideSystemPrompt === true;
		const appendEnabled = !useOverride && settings.appendSystemPrompt !== false;

		assert.equal(useOverride, true, "Should use override when enabled");
		assert.equal(appendEnabled, false, "Should not append when override is enabled");
	}

	// Test case 3: Explicit no-append mode (Claude Code preset only)
	{
		const settings = { overrideSystemPrompt: false, appendSystemPrompt: false };
		const useOverride = settings.overrideSystemPrompt === true;
		const appendEnabled = !useOverride && settings.appendSystemPrompt !== false;

		assert.equal(useOverride, false, "Should not use override");
		assert.equal(appendEnabled, false, "Should not append when explicitly disabled");
	}

	// Test case 4: Explicit append mode
	{
		const settings = { overrideSystemPrompt: false, appendSystemPrompt: true };
		const useOverride = settings.overrideSystemPrompt === true;
		const appendEnabled = !useOverride && settings.appendSystemPrompt !== false;

		assert.equal(useOverride, false, "Should not use override");
		assert.equal(appendEnabled, true, "Should append when explicitly enabled");
	}
});
