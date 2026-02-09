# Redis_basics

## Overview
Redis is an open-source, in-memory data structure store used as a database, cache, and message broker. It supports various data structures such as strings, lists, sets, sorted sets, hashes, and more.

## Features
- **In-Memory Storage**: Fast data access with data persistence options
- **Multiple Data Structures**: Strings, Lists, Sets, Sorted Sets, Hashes, Streams
- **Pub/Sub Messaging**: Publish-subscribe messaging patterns
- **Transactions**: Support for atomic operations
- **Persistence**: RDB snapshots and AOF (Append-Only File)
- **Replication**: Master-slave replication support
- **Clustering**: Distributed data storage across multiple nodes

## Installation

### Using Docker
```bash
docker run -d -p 6379:6379 redis:latest
```

### Using Package Managers
**Ubuntu/Debian:**
```bash
sudo apt-get install redis-server
```

**macOS:**
```bash
brew install redis
```

## Basic Commands

### String Operations
```bash
SET key value          # Set a key-value pair
GET key               # Get the value of a key
DEL key               # Delete a key
INCR key              # Increment a numeric value
DECR key              # Decrement a numeric value
APPEND key value      # Append value to a key
STRLEN key            # Get the length of a string
```

### List Operations
```bash
LPUSH key value       # Push value to the left of a list
RPUSH key value       # Push value to the right of a list
LPOP key              # Pop value from the left
RPOP key              # Pop value from the right
LLEN key              # Get the length of a list
LRANGE key start stop # Get a range of values
```

### Set Operations
```bash
SADD key member       # Add a member to a set
SREM key member       # Remove a member from a set
SMEMBERS key          # Get all members of a set
SCARD key             # Get the cardinality of a set
SISMEMBER key member  # Check if member exists
```

### Hash Operations
```bash
HSET key field value  # Set a hash field
HGET key field        # Get a hash field value
HDEL key field        # Delete a hash field
HGETALL key           # Get all fields and values
HKEYS key             # Get all field names
HVALS key             # Get all values
```

## Connection

### Using Redis CLI
```bash
redis-cli
```

### Using Python
```python
import redis

# Connect to Redis
r = redis.Redis(host='localhost', port=6379, db=0)

# Set and get values
r.set('name', 'Redis')
print(r.get('name'))
```

### Using Node.js
```javascript
const redis = require('redis');
const client = redis.createClient();

client.set('name', 'Redis', (err, reply) => {
  console.log(reply);
});
```

## Use Cases
- **Caching**: Improve application performance by caching frequently accessed data
- **Session Storage**: Store user session information
- **Real-time Analytics**: Track real-time metrics and counters
- **Message Queues**: Implement job queues and background tasks
- **Leaderboards**: Maintain sorted rankings
- **Rate Limiting**: Implement rate limiting mechanisms

## Resources
- [Official Redis Documentation](https://redis.io/documentation)
- [Redis CLI Commands](https://redis.io/commands)
- [Redis Modules](https://redis.io/modules)

## License
This repository is for learning purposes.