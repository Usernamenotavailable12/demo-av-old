const { App } = require('@slack/bolt');

const app = new App({
  signingSecret: 'c053ef39dcf843c3a615af267e210bf6',
  token: 'laQDXAWuO4EAzU6pnZNPZ0TH',
});

const breaks = {};

// Handle /break command
app.command('/break', async ({ ack, body, say }) => {
  ack();

  const userId = body.user_id;

  if (!breaks[userId]) {
    breaks[userId] = { start: Date.now(), type: 'short' };
    await say('Break started! Use `/endbreak` when you are back.');
  } else {
    await say('You are already on a break!');
  }
});

// Handle /endbreak command
app.command('/endbreak', async ({ ack, body, say }) => {
  ack();

  const userId = body.user_id;

  if (breaks[userId] && breaks[userId].type === 'short') {
    const duration = (Date.now() - breaks[userId].start) / 1000 / 60; // Duration in minutes
    delete breaks[userId];
    await say(`Break ended! Duration: ${duration.toFixed(2)} minutes.`);
  } else {
    await say('You are not on a short break!');
  }
});

// Handle /longbreak command
app.command('/longbreak', async ({ ack, body, say }) => {
  ack();

  const userId = body.user_id;

  if (!breaks[userId]) {
    breaks[userId] = { start: Date.now(), type: 'long' };
    await say('Long break started! Use `/endlongbreak` when you are back.');
  } else {
    await say('You are already on a break!');
  }
});

// Handle /endlongbreak command
app.command('/endlongbreak', async ({ ack, body, say }) => {
  ack();

  const userId = body.user_id;

  if (breaks[userId] && breaks[userId].type === 'long') {
    const duration = (Date.now() - breaks[userId].start) / 1000 / 60; // Duration in minutes
    delete breaks[userId];
    await say(`Long break ended! Duration: ${duration.toFixed(2)} minutes.`);
  } else {
    await say('You are not on a long break!');
  }
});

// Start the Bolt app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('Bolt app is running!');
})();
