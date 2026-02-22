<script lang="ts">
	import {
		mdiAccountMultiple,
		mdiAccountMultipleOutline,
		mdiClockOutline,
		mdiMessageFastOutline,
		mdiSend,
		mdiTextBoxCheckOutline
	} from '@mdi/js';

	import { Button, FormGroup, Header, Icon, Input, Label, Select, Textarea } from '$lib/components';
	import Radio from '$lib/components/ui/Radio.svelte';

	let { data } = $props();

	let message = $state('');
	let recipientType = $state('manual');
	let sendTimeType = $state('now');

	let currentTemplateID = $state();
	let selectedContactGroups = $state([]);

	let selectedTemplate = $derived(
		data.templates.find((template) => template.id === currentTemplateID)
	);
</script>

<Header title="Compose Text Message"></Header>

<div class="mt-4 flex w-full flex-col p-6 pt-2">
	<hr class="my-1 border-base-300" />

	<div class="flex justify-between gap-8">
		<form class="w-full space-y-3">
			<div class="flex flex-col gap-3 py-4">
				<div class="flex items-center gap-2 font-semibold">
					<Icon path={mdiAccountMultipleOutline} size={18} />
					<span class="">To</span>
				</div>

				<FormGroup>
					<div class="flex items-center gap-4">
						<Radio id="manual" name="recipientType" value="manual" bind:group={recipientType}>
							Manual Contact(s)
						</Radio>
						<Radio id="groups" name="recipientType" value="groups" bind:group={recipientType}>
							Contact Group(s)
						</Radio>
					</div>
				</FormGroup>

				{#if recipientType === 'manual'}
					<FormGroup>
						<Input
							id="contacts"
							name="contacts"
							type="text"
							placeholder="0712345678, +254100234567..."
						/>
					</FormGroup>
				{/if}

				{#if recipientType === 'groups'}
					<FormGroup>
						<Select name="contactGroupIds" id="groups" multiple>
							{#each data.contactGroups as contactGroup}
								<option value={contactGroup.id}>{contactGroup.name}</option>
							{/each}
						</Select>
					</FormGroup>
				{/if}
			</div>

			<hr class="my-1 border-base-300" />

			<div class="flex flex-col gap-3 py-4">
				<div class="flex items-center gap-2 font-semibold">
					<Icon path={mdiTextBoxCheckOutline} size={18} />
					<span class="">From</span>
				</div>

				<FormGroup>
					<Label for="sender_id">Sender ID <span class="text-error">*</span></Label>
					<Select name="senderIdId">
						{#each data.senderIds as senderId}
							<option value={senderId.id}>{senderId.name}</option>
						{/each}
					</Select>
				</FormGroup>
			</div>

			<hr class="my-1 border-base-300" />

			<div class="flex flex-col gap-3 py-4">
				<div class="flex items-center gap-2 font-semibold">
					<Icon path={mdiMessageFastOutline} size={18} />
					<span class="">Message</span>
				</div>

				<FormGroup class="space-y-2">
					<Label for="sender_id">Template</Label>
					<Select name="templateId">
						{#each data.templates as template}
							<option value={template.id}>{template.name}</option>
						{/each}
					</Select>
				</FormGroup>

				<FormGroup class="space-y-2">
					<Label for="message">Content <span class="text-error">*</span></Label>
					<Textarea name="message" class="min-h-30" bind:value={message} required />
					<div class="text-muted-foreground flex justify-between text-xs">
						<span>{message.length} characters</span>
						<span>{Math.ceil(message.length / 160) || 1} SMS</span>
					</div>
				</FormGroup>
			</div>

			<hr class="my-1 border-base-300" />

			<div class="flex flex-col gap-3 py-4">
				<div class="flex items-center gap-2 font-semibold">
					<Icon path={mdiClockOutline} size={18} />
					<span class="">Send Time</span>
				</div>

				<FormGroup>
					<div class="flex items-center gap-4">
						<Radio
							id="now"
							name="sendTimeType"
							value="now"
							class="rounded-lg border border-base-300 p-4"
							bind:group={sendTimeType}
						>
							<span class="">Now</span> <br />
							<span class="text-xs text-base-content/70">Send immediately after submission</span>
						</Radio>
						<Radio
							id="scheduled"
							name="sendTimeType"
							value="scheduled"
							class="rounded-lg border border-base-300 p-4"
							bind:group={sendTimeType}
						>
							<span class="">Schedule for later</span> <br />
							<span class="text-xs text-base-content/70"
								>Choose a specific date and time to send</span
							>
						</Radio>
					</div>
				</FormGroup>

				{#if sendTimeType === 'scheduled'}
					<div class="space-y-2">
						<Label for="schedule">Scheduled day and time</Label>
						<div class="flex items-center gap-4">
							<Input name="schedule" type="date" />
							<Input name="schedule" type="time" />
						</div>
					</div>
				{/if}
			</div>

			<hr class="my-1 border-base-300" />

			<div class="mt-8 flex justify-end gap-4">
				<Button variant="destructive" type="button" onclick={() => history.back()}>Cancel</Button>
				<Button type="submit">
					<Icon path={mdiSend} size={16} class="mr-2" />
					Send Message
				</Button>
			</div>
		</form>

		<!-- <div class="mockup-phone">
					<div class="mockup-phone-camera"></div>
					<div class="mockup-phone-display grid place-content-center bg-base-100 text-black">
						<div class="chat-start chat">
							<div class="chat-bubble">
								It's over Anakin,
								<br />
								I have the high ground.
							</div>
						</div>
					</div>
				</div> -->
	</div>
</div>
